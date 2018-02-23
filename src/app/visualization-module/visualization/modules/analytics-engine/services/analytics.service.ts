import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { from } from 'rxjs/observable/from';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { mergeMap, tap, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as analyticsHelpers from '../helpers';
import { DataDimension } from '../models/data-dimension';
import { AnalyticsHttpClientService } from './analytics-http-client.service';
import { AnalyticsDbService } from './analytics-db.service';
import {FunctionService} from "./function.service";

@Injectable()
export class AnalyticsService {
  constructor(private httpClient: AnalyticsHttpClientService,
    private analyticsDB: AnalyticsDbService,private functionService:FunctionService) {
  }

  getAnalytics(analyticsUrl: string,
    dataDimension?: DataDimension): Observable<any> {
    return new Observable(observer => {
      /**
       * Check if analytics url or data dimensions are not supplied the return null result
       */
      if ((!analyticsUrl || analyticsUrl === '') && !dataDimension) {
        observer.error({
          message: 'Analytics url or data dimensions are not supplied',
          status: ''
        });
      } else {
        /**
         * Get url for use
         * @type {string}
         */
        const analyticsUrlToUse =
          analyticsUrl || analyticsHelpers.getAnalyticsUrl(dataDimension);
        if (analyticsUrlToUse !== '') {
          /**
           * Deduce dimensions from url
           */
          const dimensionsObject: any = analyticsHelpers.getDimensionsFromUrl(
            analyticsUrlToUse
          );

          /**
           * Get analytics headers
           */
          const analyticsHeaders = analyticsHelpers.getAnalyticsHeaders(
            dimensionsObject
          );

          /**
           * Get analytics metadata
           */

          this._getAnalyticsMetadata(dimensionsObject).subscribe(
            (analyticsMetadataResponse: any) => {
              let analyticsMetadata: any = {
                ...analyticsMetadataResponse,
                headers: analyticsHeaders
              };
              /**
               * return analytics with only metadata
               */
              observer.next(analyticsMetadata);

              /**
               * Update dimension object with metadata info
               */
              if (analyticsMetadata.metaData) {
                _.each(_.keys(dimensionsObject), dimensionKey => {
                  const dimensionDetails =
                    analyticsMetadata.metaData[dimensionKey];

                  if (dimensionDetails) {
                    dimensionsObject[dimensionKey] = dimensionDetails.join(';');
                  }
                });
              }

              /**
               * Generate paired dimensions for search and find for values in index DB
               */
              // TODO FIND BEST WAY TO DEAL WITH EVENT ANALYTICS
              forkJoin(
                _.map(
                  analyticsHelpers.getPairedDimensions(dimensionsObject),
                  pairedDimension =>
                    this.analyticsDB.getAggregateRowValue(pairedDimension)
                )
              ).subscribe(dimensionValueResults => {
                const resultWithData = _.filter(
                  dimensionValueResults,
                  result => result[_.keys(result)[0]]
                );

                const resultWithoutData = _.filter(
                  dimensionValueResults,
                  result => !result[_.keys(result)[0]]
                );

                /**
                 * Update analytics with locally obtained data
                 */
                if (resultWithData.length > 0) {
                  analyticsMetadata = {
                    ...analyticsMetadata,
                    headers: analyticsHeaders,
                    rows: [
                      ...analyticsHelpers.mapLocalDataResultsToRows(
                        resultWithData
                      )
                    ]
                  };
                  observer.next(analyticsMetadata);

                  if (resultWithoutData.length === 0) {
                    observer.complete();
                  }
                }

                /**
                 * Update analytics with data from server
                 */
                if (resultWithoutData.length > 0) {
                  this._getAnalyticsObjectFromServer(
                    analyticsHelpers.mapDataResultToDimensionObject(
                      resultWithoutData
                    )
                  ).subscribe(
                    (analyticsResponse: any) => {
                      if (analyticsResponse && analyticsResponse.rows) {
                        observer.next(analyticsHelpers.getMergedAnalytics(
                          _.filter([analyticsResponse, analyticsMetadata], analytics => analytics)));
                      }
                    },
                    analyticsError => observer.error(analyticsError),
                    () => observer.complete()
                  );
                }
              });
            },
            analyticsMetadataError => observer.error(analyticsMetadataError)
          );
        } else {
          observer.error({
            message: 'data dimensions missing',
            status: ''
          });
        }
      }
    });
  }

  private _getAnalyticsObjectFromServer(dataDimension: DataDimension) {
    return new Observable(observer => {
      const dataDimensionArray: any[] = [
        {
          useFunction: false,
          dataDimension: {
            ...dataDimension,
            dimensions: _.filter(
              dataDimension.dimensions,
              dimensionObject => dimensionObject.dimension !== 'fn'
            )
          }
        },
        {
          useFunction: true,
          dataDimension: {
            ...dataDimension,
            dimensions: _.filter(
              dataDimension.dimensions,
              dimensionObject => dimensionObject.dimension !== 'dx'
            )
          }
        }
      ];

      from(dataDimensionArray).pipe(
        mergeMap(
          (dataDimensionObject: any) =>
            dataDimensionObject.useFunction
              ? this._getAnalyticsForFunctionDimensions(
              dataDimensionObject.dataDimension
              )
              : this._getAnalyticsForNormalDimensions(
              dataDimensionObject.dataDimension
              )
        )
      ).subscribe(
        (analyticsResponse: any) => {
          observer.next(analyticsResponse);
        },
        analyticsError => observer.error(analyticsError),
        () => observer.complete()
      );
    });
  }

  private _getAnalyticsForNormalDimensions(dataDimension: DataDimension): Observable<any> {
    const analyticsUrl = analyticsHelpers.getAnalyticsUrl(dataDimension);
    if (analyticsUrl === '') {
      of({});
    }

    return this.httpClient.get(analyticsUrl + '&skipMeta=true');
  }

  private _getAnalyticsForFunctionDimensions(dataDimension: DataDimension): Observable<any> {
    // get functions id from data
    const functionDimensionValues: any = _.filter(_.map(_.map(
      _.filter(dataDimension.dimensions, (dimensionObject: any) => dimensionObject.dimension === 'fn'),
      (functionDimension: any) => functionDimension.value), (functionDimension: string) => {
      const splitedDimension = functionDimension.split('.');
      return splitedDimension.length === 2 ? {
        functionId: splitedDimension[0],
        ruleId: splitedDimension[1]
      } : null;
    }), (functionDimension: any) => functionDimension);

    // From rule id from associated functions

    // run the function to get desired result
    return new Observable(observer => {
      this.functionService.get(functionDimensionValues[0].functionId).subscribe((func:any)=>{
        let selectedRule;
        func.rules.forEach((rule)=>{
          if(rule.id == functionDimensionValues[0].ruleId){
            selectedRule = rule;
          }
        })
        let parameters = {
          dx:_.findKey(dataDimension.dimensions,
            (dimensionObject:any) => dimensionObject.dimension !== 'dx'),
          ou:_.findKey(dataDimension.dimensions,
            (dimensionObject:any) => dimensionObject.dimension !== 'ou'),
          pe:_.findKey(dataDimension.dimensions,
            (dimensionObject:any) => dimensionObject.dimension !== 'pe'),
          rule:selectedRule
        }
        dataDimension.dimensions.forEach((dimension)=>{
          if(dimension.dimension == "pe"){
            parameters.pe = dimension.value
          }else if(dimension.dimension == "ou"){
            parameters.ou = dimension.value
          }
        })
        this.functionService.run(parameters, func).subscribe((results:any)=> {
          observer.next(results);
          observer.complete();
        },(error)=>{

        })
      })
    });
  }

  private _getAnalyticsMetadata(dimensionsObject: any): Observable<any> {
    /**
     * Filter dimensions objects essential for metadata call
     */
    const dimensionsForMetadataCall = _.map(
      _.filter(
        _.keys(dimensionsObject),
        key => ['fn', 'displayProperty', 'aggregationType'].indexOf(key) === -1
      ),
      key => {
        return {dimension: key, value: dimensionsObject[key]};
      }
    );

    /**
     * Construct new analytics url for metadata call
     */
      // TODO find best way to distinguish between aggregate and event
    const analyticsForMetadataCall = analyticsHelpers.getAnalyticsUrl({
        dimensions: dimensionsForMetadataCall,
        analyticsType: 'AGGREGATE'
      });

    /**
     * Call for analytics with metadata only
     */
    return this.httpClient.get(analyticsForMetadataCall + '&skipData=true');
  }
}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { AutoGrowing } from '../models/auto-growing';
import { CategoryCombo } from '../models/category-combo';
import { DataElement } from '../models/data-element';
import { DataelementGroup } from '../models/dataelement-group';
import { DataSet } from '../models/dataset';
import { Indicator } from '../models/indicator';
import { IndicatorGroup } from '../models/indicator-group';
import { OrganisationUnit } from '../models/organisation-unit';
import {
  CATEGORY_COMBOS_KEY,
  DATAELEMENT_GROUP_KEY,
  DATAELEMENT_KEY,
  DATASET_KEY,
  INDICATOR_GROUP_KEY,
  INDICATOR_KEY,
  LocalStorageService,
  ORGANISATION_UNIT_KEY,
  PROGRAM_KEY
} from './local-storage.service';

@Injectable()
export class DataService {
  metaData = {
    organisationUnits: [],
    dataElements: [],
    indicators: [],
    dataElementGroups: [],
    indicatorGroups: [],
    categoryOptions: [],
    dataSets: []
  };

  constructor(
    private http: Http,
    private localDbService: LocalStorageService
  ) {}

  getIndicators(): Observable<Indicator[]> {
    return this.http
      .get(
        '../../../api/indicators.json?fields=id,name,dataSets[periodType]&paging=false'
      )
      .pipe(map((res: any) => res.indicators || []));
  }

  getDataElements(): Observable<DataElement[]> {
    return this.http
      .get(
        '../../../api/dataElements.json?fields=id,name,categoryCombo,dataSetElements[dataSet[periodType]&paging=false'
      )
      .pipe(map((res: any) => res.dataElements || []));
  }

  getDataSets(): Observable<DataSet[]> {
    return this.http
      .get('../../../api/dataSets.json?paging=false&fields=id,name')
      .pipe(map((res: any) => res.dataSets || []));
  }

  getCategoryCombos(): Observable<CategoryCombo[]> {
    return this.http
      .get(
        '../../../api/categoryCombos.json?fields=id,name,categoryOptionCombos[id,name]&paging=false'
      )
      .pipe(map((res: any) => res.categoryCombos || []));
  }

  getOrganisationUnits(): Observable<OrganisationUnit[]> {
    return this.http
      .get(
        '../../../api/organisationUnits.json?fields=id,name,children,parent&paging=false'
      )
      .pipe(map((res: any) => res.organisationUnits || []));
  }

  getDataElementGroups(): Observable<DataelementGroup[]> {
    return this.http
      .get(
        '../../../api/dataElementGroups.json?paging=false&fields=id,name,dataElements' +
          '[id,name,categoryCombo,dataSetElements[dataSet[periodType]]'
      )
      .pipe(map((res: any) => res.dataElementGroups || []));
  }

  getIndicatorGroups(): Observable<IndicatorGroup[]> {
    return this.http
      .get(
        '../../../api/indicatorGroups.json?paging=false&fields=id,name,indicators[id,name,dataSets[periodType]]'
      )
      .pipe(map((res: any) => res.indicatorGroups || []));
  }

  getPrograms(): Observable<AutoGrowing[]> {
    return this.http
      .get('../../../api/programs.json?paging=false&fields=id,name,programType')
      .pipe(map((res: any) => res.programs || []));
  }

  initiateData() {
    return forkJoin(
      this.getDataFromLocalDatabase(DATAELEMENT_KEY),
      this.getDataFromLocalDatabase(INDICATOR_KEY),
      this.getDataFromLocalDatabase(INDICATOR_GROUP_KEY),
      this.getDataFromLocalDatabase(DATAELEMENT_GROUP_KEY),
      this.getDataFromLocalDatabase(DATASET_KEY),
      this.getDataFromLocalDatabase(CATEGORY_COMBOS_KEY),
      this.getDataFromLocalDatabase(PROGRAM_KEY)
    );
  }

  getFunctions() {
    return new Observable(observ => {
      this.http
        .get('../../../api/dataStore/functions')
        .pipe(map((res: any) => res))
        .subscribe(
          results => {
            const observable = [];
            results.forEach(id => {
              observable.push(
                this.http
                  .get('../../../api/dataStore/functions/' + id)
                  .pipe(map((res: any) => res))
              );
            });
            forkJoin(observable).subscribe(
              (responses: any) => {
                const functions = [];
                responses.forEach((response, index) => {
                  functions.push(response);
                });
                observ.next(functions);
                observ.complete();
              },
              error => {}
            );
          },
          error => {}
        );
    });
  }

  getMapping() {
    return new Observable(observ => {
      this.http
        .get('../../../api/dataStore/functionMapper')
        .pipe(map((res: any) => res))
        .subscribe(
          results => {
            const observable = [];
            results.forEach(id => {
              observable.push(
                this.http
                  .get('../../../api/dataStore/functionMapper/' + id)
                  .pipe(map((res: any) => res))
              );
            });
            forkJoin(observable).subscribe(
              (responses: any) => {
                const functions = [];
                responses.forEach((response, index) => {
                  functions.push(response);
                });
                observ.next(functions);
                observ.complete();
              },
              error => {
                observ.error();
              }
            );
          },
          error => {
            observ.error();
          }
        );
    });
  }

  /**
   * This function will be used to return all needed metadata either from offline or if not available the online
   * @param key
   * @returns {any}
   */
  getDataFromLocalDatabase(key: string): Observable<any> {
    return Observable.create(observer => {
      this.localDbService.getAll(key).subscribe(
        items => {
          if (items.length !== 0) {
            observer.next(items);
            observer.complete();
          } else {
            let dataStream$ = null;
            switch (key) {
              case DATAELEMENT_KEY:
                dataStream$ = this.getDataElements();
                break;
              case DATASET_KEY:
                dataStream$ = this.getDataSets();
                break;
              case ORGANISATION_UNIT_KEY:
                dataStream$ = this.getOrganisationUnits();
                break;
              case CATEGORY_COMBOS_KEY:
                dataStream$ = this.getCategoryCombos();
                break;
              case INDICATOR_KEY:
                dataStream$ = this.getIndicators();
                break;
              case INDICATOR_GROUP_KEY:
                dataStream$ = this.getIndicatorGroups();
                break;
              case DATAELEMENT_GROUP_KEY:
                dataStream$ = this.getDataElementGroups();
                break;
              case PROGRAM_KEY:
                dataStream$ = this.getPrograms();
                break;
              default:
                console.error('The key passed is not recognized');
                break;
            }
            dataStream$.subscribe(
              data => {
                data.forEach(val => {
                  this.localDbService.add(key, val).subscribe(v => null);
                });
                observer.next(data);
                observer.complete();
              },
              error => observer.error(error)
            );
          }
        },
        error => observer.error(error)
      );
    });
  }
}

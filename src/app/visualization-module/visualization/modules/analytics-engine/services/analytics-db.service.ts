import { Injectable } from '@angular/core';
import { AnalyticsDatabase } from '../models/analytics-database';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AnalyticsDbService {
  private _analyticsDB: AnalyticsDatabase;
  constructor() {
    // TODO DATA TO BE SAVED INDEX DB
    this._analyticsDB = {
      dateCreated: undefined,
      data: {
        aggregate: {}
      }
    };
  }

  getAggregateRowValue(searchKey: string): Observable<any> {
    return of({
      [searchKey]: this._analyticsDB.data.aggregate[searchKey]
    });
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FunctionObject } from '../models/function-object';
import { FunctionParameters } from '../models/function-parameters';
import { HttpClientService } from '../../../../core/services/http-client.service';

@Injectable()
export class FunctionService {
  constructor(private http: HttpClientService) {}
  getId(number?) {
    let url = 'system/id';
    if (number) {
      url += '.json?limit=' + number;
    }
    return this.http.get(url);
  }

  delete(sFunction: FunctionObject) {
    return new Observable(observable => {
      this.http.delete('dataStore/functions/' + sFunction.id).subscribe(
        results => {
          observable.next(results);
          observable.complete();
        },
        error => {
          observable.error(error.json());
          observable.complete();
        }
      );
    });
  }

  apiVersion = '';
  get(id) {
    return new Observable(observable => {
      this.http.get('dataStore/functions/' + id).subscribe(
        func => {
          observable.next(func);
          observable.complete();
        },
        error => {
          observable.error(error.json());
          observable.complete();
        }
      );
    });
  }

  run(functionParameters: FunctionParameters, functionObject: FunctionObject) {
    return new Observable(observ => {
      if (!this.isError(functionObject.function)) {
        try {
          functionParameters.error = error => {
            observ.error(error);
            observ.complete();
          };
          functionParameters.success = results => {
            observ.next(results);
            observ.complete();
          };
          const execute = Function('parameters', functionObject.function);
          execute(functionParameters);
        } catch (e) {
          observ.error(e.stack);
          observ.complete();
        }
      } else {
        observ.error({ message: 'Errors in the code.' });
        observ.complete();
      }
    });
  }

  isError(code) {
    let successError = false;
    let errorError = false;
    let progressError = false;
    const value = code
      .split(' ')
      .join('')
      .split('\n')
      .join('')
      .split('\t')
      .join('');
    if (value.indexOf('parameters.success(') === -1) {
      successError = true;
    }
    if (value.indexOf('parameters.error(') === -1) {
      errorError = true;
    }
    if (value.indexOf('parameters.progress(') === -1) {
      progressError = true;
    }
    return successError || errorError;
  }
}

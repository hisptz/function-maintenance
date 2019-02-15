import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpClientService {
  public APIURL = '../../../api/';
  constructor(private http: Http) {
    this.http = http;
  }

  createAuthorizationHeader(headers: Headers, options?) {
    if (options) {
      options.forEach(key => {
        headers.append(key, options[key]);
      });
    }
  }

  get(url) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.APIURL + url, {
      headers: headers
    });
  }

  post(url, data, options?) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers, options);
    return this.http
      .post(this.APIURL + url, data, {
        headers: headers
      })
      .pipe(map(this.responseHandler()));
  }
  put(url, data, options?) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers, options);
    return this.http
      .put(this.APIURL + url, data, {
        headers: headers
      })
      .pipe(map(this.responseHandler()));
  }
  delete(url, options?) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers, options);
    return this.http
      .delete(this.APIURL + url, {
        headers: headers
      })
      .pipe(map(this.responseHandler()));
  }
  responseHandler() {
    return res => {
      try {
        const returnJSON = res.json();
        return returnJSON;
      } catch (e) {
        location.reload();
        return null;
      }
    };
  }
}

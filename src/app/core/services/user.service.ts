import { Injectable } from '@angular/core';
<<<<<<< HEAD:src/app/core/services/user.service.ts
import { Observable } from 'rxjs';
import { User } from '../models';
import { NgxDhis2HttpClientService } from '@hisptz/ngx-dhis2-http-client';
=======
import { HttpClientService } from './http-client.service';
import { Observable } from 'rxjs';
>>>>>>> 1.x.x:src/app/services/user.service.ts

@Injectable({ providedIn: 'root' })
export class UserService {
<<<<<<< HEAD:src/app/core/services/user.service.ts
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  /**
   * Load current user information
   * @returns {Observable<User>}
   */
  loadCurrentUser(): Observable<User> {
    return this.httpClient
      .get(`me.json?fields=id,name,displayName,created,lastUpdated,email,
    dataViewOrganisationUnits[id,name,level],organisationUnits[id,name,level],userCredentials[username]`);
  }

  userGroups
  getUserGroups(){
    return new Observable((observable)=>{
      if(this.userGroups){
        observable.next(this.userGroups);
        observable.complete();
      }else{
        this.httpClient.get("userGroups").subscribe((results:any)=>{
          this.userGroups = results.userGroups;
          observable.next(this.userGroups);
          observable.complete();
        },(error)=>{
          observable.error(error.json());
          observable.complete();
        })
=======
  constructor(private http: HttpClientService) {}

  userGroups;
  getUserGroups() {
    return new Observable(observable => {
      if (this.userGroups) {
        observable.next(this.userGroups);
        observable.complete();
      } else {
        this.http.get('userGroups').subscribe(
          (results: any) => {
            this.userGroups = results.userGroups;
            observable.next(this.userGroups);
            observable.complete();
          },
          error => {
            observable.error(error.json());
            observable.complete();
          }
        );
>>>>>>> 1.x.x:src/app/services/user.service.ts
      }
    });
  }
  user;
  getCurrentUser() {
    return new Observable(observable => {
      if (this.user) {
        observable.next(this.user);
        observable.complete();
<<<<<<< HEAD:src/app/core/services/user.service.ts
      }else{
        this.loadCurrentUser().subscribe((results)=>{
          this.user = results;
          observable.next(this.user);
          observable.complete();
        },(error)=>{
          observable.error(error.json());
          observable.complete();
        })
=======
      } else {
        this.http.get('25/me').subscribe(
          results => {
            this.user = results;
            observable.next(this.user);
            observable.complete();
          },
          error => {
            observable.error(error.json());
            observable.complete();
          }
        );
>>>>>>> 1.x.x:src/app/services/user.service.ts
      }
    });
  }
}

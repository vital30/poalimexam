import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/map'


@Injectable({
  providedIn: 'root'
})
export class DatabaseBarService {

  constructor(private http: HttpClient) {  }
  
  getUsers(): Observable<any> {
    return this.http.get<any>("./assets/users.json");

    // let response = this.http.get("./assets/users.json")
    //     // ...and calling .json() on the response to return data
    //     .pipe(map((response: any) => response.json()));
    // return response;
  }

  getComments(): Observable<any> {
    return this.http.get<any>("./assets/comments.json");

    // let response = this.http.get("./assets/users.json")
    //     // ...and calling .json() on the response to return data
    //     .pipe(map((response: any) => response.json()));
    // return response;
  }


}
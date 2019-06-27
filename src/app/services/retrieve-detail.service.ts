import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RetrieveDetailService {
	email:any;

 URL = "https://p51c8use3g.execute-api.us-east-1.amazonaws.com/development/dbreadver1";

  constructor(private http: HttpClient) { }


retrieveUser(email): Observable<any> {
	this.URL = "https://p51c8use3g.execute-api.us-east-1.amazonaws.com/development/dbreadver1";
	this.URL = this.URL + '?email=' + email;

  return this.http.get(this.URL);

}
}

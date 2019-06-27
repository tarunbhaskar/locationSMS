import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UpdateLocationService {

 	name:any;
	email:any;

 URL = "https://g7jr21p17l.execute-api.us-east-1.amazonaws.com/development/dbupdatever1";

  constructor(private http: HttpClient) { }


updateLocation(email, locationAvailable): Observable<any> {

	this.URL = "https://g7jr21p17l.execute-api.us-east-1.amazonaws.com/development/dbupdatever1";

	this.URL = this.URL + '?email=' + email + '&locationAvailable=' + locationAvailable ;

     return  this.http.get(this.URL);

}
}

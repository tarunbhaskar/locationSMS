import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddDetailsService {
	name:any;
	email:any;

 URL = "https://xb11ibzs6c.execute-api.us-east-1.amazonaws.com/development/dbwritever1";

  constructor(private http: HttpClient) { }


addData(email, name, contact): Observable<any> {
	this.URL = "https://xb11ibzs6c.execute-api.us-east-1.amazonaws.com/development/dbwritever1";

	this.URL = this.URL + '?email=' + email + '&name=' + name + '&contact=' + contact;

     return  this.http.get(this.URL);

}
}

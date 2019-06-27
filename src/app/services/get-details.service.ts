import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CognitoServiceService } from "../services/cognito-service.service";

@Injectable({
  providedIn: 'root'
})
export class GetDetailsService {

  URL = "https://iy1h25hvrd.execute-api.us-east-1.amazonaws.com/development/getdetailver1";

  constructor(private http: HttpClient, public CognitoService: CognitoServiceService) { }


getData(): Observable<any> {

	/*const httpOptions = {
      headers: new HttpHeaders({      
        'Authorization': this.CognitoService.getToken()
      })
    };*/

  return this.http.get(this.URL);

}
}

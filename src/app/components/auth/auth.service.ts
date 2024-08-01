import { Observable, catchError, throwError } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  baseUrl = 'http://localhost/PHPworkspace/survey-brewery/';
  // baseUrl = 'https://www.surveybrewery.com/survey-brewery/';
  
   httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) { }
  createUser(data: any) {
    return this.http.post(this.baseUrl+'user-registration/create-user.php', data, {
      headers:this.httpHeaders
    });
  }
  updateUser(data:any,id:any):Observable<any>{
    return this.http.put(this.baseUrl+'user-registration/update-user.php/'+id,data, {
      headers:this.httpHeaders
    })
  }
  login(data:any):Observable<any>{
    return this.http.post(this.baseUrl+'user-registration/login.php',data, {
      headers:this.httpHeaders
    });
  }
  loginWithGoogle(data:any):Observable<any>{
    return this.http.post(this.baseUrl+'user-registration/login-with-google.php',data, {
      headers:this.httpHeaders
    });
  }
  public isAuthenticated(): boolean {
    return this.getToken() !== null;
  }


  getToken() {
    let accessToken = localStorage.getItem('accessToken');
    if (accessToken != null) {
      return accessToken;
    }
    return null;
  }
  getLoggedUserId() {
    let user_id = localStorage.getItem('user_id');
    if (user_id != null) {
      return user_id;
    }
    return null;
  }
}
 
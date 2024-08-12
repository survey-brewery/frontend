import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 baseUrl = 'http://localhost/PHPworkspace/survey-brewery/';
//  baseUrl = 'https://www.surveybrewery.com/survey-brewery/';
 httpHeaders = new HttpHeaders({
  'Content-Type': 'application/json'
});
user_id:any

constructor(private http: HttpClient) {
  this.user_id= localStorage.getItem('user_id') as string;
 }

 //create survey...
 createSurvey(data: any) {
   return this.http.post(this.baseUrl+'user/survey/create-survey.php', data, {
     headers:this.httpHeaders
   });
 }
 //for user dashboard survey list  
 getAllSurveyBasicDetailsList(user_id:any,page:any,perPage:any):Observable<any>{
  // let params =new HttpParams().set('user_id',user_id);
  let params={
    'user_id':user_id, 
    'page':page,
    'perPage':perPage
  }
  if(page==''||perPage==''){
    delete params['page'];
    delete params['perPage'];
  }

  return this.http.get(this.baseUrl+'user/survey/all-survey-basic-list.php',{
    params:params
  });
 }

 //get survey by survey id...
 getSurveyById(id:any,user_id:any):Observable<any>{
  let params =new HttpParams().set('user_id',user_id)
  return this.http.get(this.baseUrl+'user/survey/getSurveyById.php/'+id,{
    params:params
  })
 }
 
 //fill survey 
 fillSurvey(data:any):Observable<any>{
  return this.http.post(this.baseUrl+'user/fill-survey/fill-survey.php',data,{
    headers:this.httpHeaders
  });
 }

 //get survey list for fill survey...
 getSurveyListForFillSurvey(user_id:any,maxToMin:any,minToMax:any,level_id:any):Observable<any>{
  let params={
    'user_id':user_id,
    'maxToMin':maxToMin,
    'minToMax':minToMax,
    'level_id':level_id
  };
  if(maxToMin!='true'){
    delete params['maxToMin'];
  }
  if(minToMax!='true'){
    delete params['minToMax'];
  }

  return this.http.get(this.baseUrl+'user/survey/all-survey-list.php',{
    params:params
  })
 }
 getTotalKarmaPoints(user_id:any):Observable<any>{
  let params=new HttpParams().set('user_id',user_id);
  return this.http.get(this.baseUrl+'user/karma-point/get-total-karma-points.php',{
    params:params
  })
 }
 getAllDetails(user_id:any):Observable<any>{
  let params=new HttpParams().set('user_id',user_id);
  return this.http.get(this.baseUrl+'user/dashboard/get-all-details.php',{
    params:params
  });
 }
 //survey enable disable 
 surveyEnableDisable(id: number, status: number): Observable<any> {
  let param = new HttpParams().set('status', status);
  return this.http.put(this.baseUrl + 'user/survey/survey-enable-disable.php/' + id, status, {
    params: param,
  });
}
getFillSurveyResponse(surveyId:any):Observable<any>{
return this.http.get(this.baseUrl+'user/fill-survey/getFillSurveyResponse.php/'+surveyId)
}
getUserListSurveyId(surveyId:any):Observable<any>{
  return this.http.get(this.baseUrl+'user/fill-survey/user-list-survey-id.php/'+surveyId)
  }
fillSurveyViewById(id:any):Observable<any>{
  return this.http.get(this.baseUrl+'user/fill-survey/getFillSurveyById.php/'+id)
}

}

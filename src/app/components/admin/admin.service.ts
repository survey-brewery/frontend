import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.baseUrl;
  httpHeaders = new HttpHeaders({
   'Content-Type': 'application/json'
 });
 constructor(private http: HttpClient) { }
  //create Level...
  createLevel(data: any) {
    return this.http.post(this.baseUrl+'admin/master-tables/level/create-level.php', data);
  }
 
  //get all Levels list...
  getAllLevelsList(user_id:any):Observable<any>{
    let params={
      user_id:user_id
    }
    if (user_id==''||user_id==undefined) {
      delete params['user_id']
    }
   return this.http.get(this.baseUrl+'admin/master-tables/level/all-levels-list.php',{
    params:params
   });
  }
   //get all Levels list...
   getAllAdminLevelsList(page:any,perPage:any):Observable<any>{
    let params={
      'page':page,
      'perPage':perPage
    };
    if(page==''||perPage==''){
      delete params['page'];
      delete params['perPage'];
    }
       return this.http.get(this.baseUrl+'admin/master-tables/level/all-admin-levels-list.php',{
        params:params
       });
      }
  //update Level...
  updateLevel(userData:any,user_id:any):Observable<any>{
   return this.http.put(this.baseUrl+'admin/master-tables/level/update-Level.php/'+user_id,userData);
  }
  //delete Level...
  deleteLevelById(id:any):Observable<any>{
   return this.http.delete(this.baseUrl+'admin/master-tables/level/delete-Level.php/'+id)
  }
 
 //create region...
 createRegion(data: any) {
   return this.http.post(this.baseUrl+'admin/master-tables/regions/create-region.php', data);
 }

 //get all regions list...
 getAllRegionsList(page:any,perPage:any):Observable<any>{
  let params={
    page:page,
    perPage:perPage,
  }
  if(page==''||perPage==''){
   delete params['page'];
   delete params['perPage'];
 }
  return this.http.get(this.baseUrl+'admin/master-tables/regions/all-regions-list.php',{
    params:params
  });
 }

 //update region...
 updateRegion(userData:any,user_id:any):Observable<any>{
  return this.http.put(this.baseUrl+'admin/master-tables/regions/update-region.php/'+user_id,userData);
 }
 //delete region...
 deleteRegionById(id:any):Observable<any>{
  return this.http.delete(this.baseUrl+'admin/master-tables/regions/delete-region.php/'+id)
 }
  //create Profession...
  createProfession(data: any) {
    return this.http.post(this.baseUrl+'admin/master-tables/professions/create-profession.php', data);
  }
 
  //get all Professions list...
  getAllProfessionsList(page:any,perPage:any):Observable<any>{
    let params={
      page:page,
      perPage:perPage,
    }
    if(page==''||perPage==''){
     delete params['page'];
     delete params['perPage'];
   }
   return this.http.get(this.baseUrl+'admin/master-tables/professions/all-professions-list.php',{
    params:params
   });
  }
 
  //update Profession...
  updateProfession(userData:any,id:any):Observable<any>{
   return this.http.put(this.baseUrl+'admin/master-tables/professions/update-profession.php/'+id,userData);
  }
  //delete Profession...
  deleteProfessionById(id:any):Observable<any>{
   return this.http.delete(this.baseUrl+'admin/master-tables/professions/delete-Profession.php/'+id)
  }
 
 //create question-type...
 createQuestionType(data: any) {
  return this.http.post(this.baseUrl+'admin/master-tables/questions-type/create-question-type.php', data);
}

//get all questions-type list...
getAllQuestionsTypeList(page:any,perPage:any):Observable<any>{
  let params={
    page:page,
    perPage:perPage,
  }
  if(page==''||perPage==''){
   delete params['page'];
   delete params['perPage'];
 }
 return this.http.get(this.baseUrl+'admin/master-tables/questions-type/all-questions-type-list.php',{
  params:params
 });
}

//update question-type...
updateQuestionType(userData:any,id:any):Observable<any>{
 return this.http.put(this.baseUrl+'admin/master-tables/questions-type/update-question-type.php/'+id,userData);
}
//delete question-type...
deleteQuestionTypeById(id:any):Observable<any>{
 return this.http.delete(this.baseUrl+'admin/master-tables/questions-type/delete-question-type.php/'+id)
}
//all user list...
allUserList(page:any,perPage:any):Observable<any>{
  let params={
    page:page,
    perPage:perPage
  }
  if (page===''||perPage==='') {
    delete params['page'];
    delete params['perPage'];
  }
  return this.http.get(this.baseUrl+'user-registration/all-user-registration-list.php',{
    params:params
  })
}
// user-registration/user-details-by-id.php/6
getUserDetailsById(user_id:any):Observable<any>{
  return this.http.get(this.baseUrl+'user-registration/user-details-by-id.php/'+user_id)
}
 //create sub Profession...
 createSubProfession(data: any) {
  return this.http.post(this.baseUrl+'admin/master-tables/sub-professions/create-sub-profession.php', data);
}

//get all sub Professions list...
getAllSubProfessionsList(page:any,perPage:any):Observable<any>{
 let params={
   page:page,
   perPage:perPage,
 }
 if(page==''||perPage==''){
  delete params['page'];
  delete params['perPage'];
}
 return this.http.get(this.baseUrl+'admin/master-tables/sub-professions/all-sub-professions-list.php',{
   params:params
 })
}

//update Profession...
updateSubProfession(userData:any,id:any):Observable<any>{
 return this.http.put(this.baseUrl+'admin/master-tables/sub-professions/update-sub-profession.php/'+id,userData);
}
//delete Profession...
deleteSubProfessionById(id:any):Observable<any>{
 return this.http.delete(this.baseUrl+'admin/master-tables/sub-professions/delete-sub-profession.php/'+id)
}
//sub profession list by profession id...
subProfessionListByProfessionId(id:any):Observable<any>{
  return this.http.get(this.baseUrl+'admin/master-tables/sub-professions/subProfessionByProfessionId.php/'+id)
}

getCreateSurveyList(fromDate:any,toDate:any,user_id:any,page:any,perPage:any):Observable<any>{
  let params={
    'fromDate':fromDate,
    'toDate':toDate,
    'user_id':user_id,
    'page':page,
    'perPage':perPage
  };
  if(fromDate==null||fromDate==''){
    delete params['fromDate'];
  }
   if(toDate==null||toDate==''){
    delete params['toDate'];
  }
   if(user_id==''||user_id==null){
    delete params['user_id'];
  }
  if(page==''||perPage==''){
    delete params['page'];
    delete params['perPage'];
  }
   if(toDate==null||toDate==''){
    delete params['toDate'];
  }
   if(user_id==''||user_id==null){

    delete params['user_id'];
  }
  if(page==''||perPage==''){
    delete params['page'];
    delete params['perPage'];
  }
  return this.http.get(this.baseUrl+'admin/survey/create-survey/create-survey-list.php',{
    params:params
  })
}
getFillSurveyList(fromDate:any,toDate:any,user_id:any,page:any,perPage:any):Observable<any>{
  let params={
    'fromDate':fromDate,
    'toDate':toDate,
    'user_id':user_id,    
    'page':page,
    'perPage':perPage
  };
  if(fromDate==null||fromDate==''){
    delete params['fromDate'];
  }else if(toDate==null||toDate==''){
    delete params['toDate'];
  }else if(user_id==''){
    delete params['user_id'];
  }else if(page==''||perPage==''){
    delete params['page'];
    delete params['perPage'];
  }else{
    
  }
  return this.http.get(this.baseUrl+'admin/survey/fill-survey/fill-survey-list.php',{
    params:params
  })
}

//get possible response count
getPossibleResponseCount(gender:any,region_id:any,profession_id:any,sub_profession_id:any):Observable<any>{
  let params:any={
    gender:gender,
    region_id:region_id,
    profession_id:profession_id,
    sub_profession_id:sub_profession_id
  }
  if(gender==0||gender==''){
    delete params['gender'];
  }
  if(region_id==0||region_id==''){
    delete params['region_id'];
  }
  if(profession_id==0||profession_id==''){
    delete params['profession_id'];
  }
  if(sub_profession_id==0||sub_profession_id==''){
    delete params['sub_profession_id'];
  }
  
  return this.http.get(this.baseUrl+'user/dashboard/possible-response-count.php',{
    params:params
  })
}

//create percentage...
createPercentage(data: any) {
  return this.http.post(this.baseUrl+'admin/master-tables/percentage/create-percentage.php', data);
}

//get all percentages list...
getAllPercentagesList(page:any,perPage:any):Observable<any>{
  let params={
    'page':page,
    'perPage':perPage
  };
  if(page==''||perPage==''){
    delete params['page'];
    delete params['perPage'];
  }
 return this.http.get(this.baseUrl+'admin/master-tables/percentage/all-percentages-list.php',{
  params:params
 });
}
//update percentage...
updatePercentage(userData:any,user_id:any):Observable<any>{
 return this.http.put(this.baseUrl+'admin/master-tables/percentage/update-percentage.php/'+user_id,userData);
}
  // enable disable percentage api
  percentageEnableDisable(id: number, status: number): Observable<any> {
    let param = new HttpParams().set('status', status);
    return this.http.put(this.baseUrl + 'admin/master-tables/percentage/percentage-enable-disable.php/' + id, status, {
      params: param,
    });
  }
  getFillSurveyLiest(fromDate:any,toDate:any,user_id:any,page:any,perPage:any):Observable<any>{
    let params={
      'fromDate':fromDate,
      'toDate':toDate,
      'user_id':user_id,    
      'page':page,
      'perPage':perPage
    };
    if(fromDate==null||fromDate==''){
      delete params['fromDate'];
    }
    if(toDate==null||toDate==''){
      delete params['toDate'];
    }
    if(user_id==''){
      delete params['user_id'];
    }
    if(page==''||perPage==''){
      delete params['page'];
      delete params['perPage'];
    }
    return this.http.get(this.baseUrl+'admin/survey/fill-survey/fill-survey-list.php',{
      params:params
    })
  }
  getKarmaPointHistory(page:any,perPage:any,user_id:any):Observable<any>{
    let params={
      page:page,
      perPage:perPage,
      user_id:user_id
    }
    if(page==''||perPage==''){
      delete params['page'];
      delete params['perPage'];
    }
    return this.http.get(this.baseUrl+'user-registration/karma-point-history.php',{
      params:params
    });
  }
}


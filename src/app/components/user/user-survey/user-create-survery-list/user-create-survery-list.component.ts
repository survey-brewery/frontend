import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-user-create-survery-list',
  templateUrl: './user-create-survery-list.component.html',
  styleUrls: ['./user-create-survery-list.component.scss']
})
export class UserCreateSurveryListComponent  implements OnInit {
  user_id: any;
  userDetails: any = {};
  allSurveyList:Array<any>=[];
  page: number = 1;
  pageSize: number = 10;
  total:any;
  constructor (private _userService:UserService){
    
  }
  ngOnInit():void{
    this.user_id = localStorage.getItem('user_id') as string;
    this.getDetails();
    this.getAllSurveyBasicDetailsList();
  }
getDetails() {
  this._userService.getAllDetails(this.user_id).subscribe({
    next: (res: any) => {
      this.userDetails = res.data;
    }
  });
}
getAllSurveyBasicDetailsList(){
  this._userService.getAllSurveyBasicDetailsList(this.user_id,this.page,this.pageSize).subscribe({
    next: (res: any) => {
      if (res.data.length > 0) {
        this.allSurveyList = res.data;
        this.total=res.pagination.total;
        this.total=100;
      } else {
        this.allSurveyList=[];
        this.total=0;
      }
    },
    error:(err:any)=>{
      console.log();
      this.allSurveyList=[]
    }
  })
}
onPageChange(event: PageEvent): void {
  this.page = event.pageIndex + 1;
  this.pageSize = event.pageSize;
  this.getAllSurveyBasicDetailsList();
}
}
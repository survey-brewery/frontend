import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AdminService } from '../../admin/admin.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-user-karma-point',
  templateUrl: './user-karma-point.component.html',
  styleUrls: ['./user-karma-point.component.scss']
})
export class UserKarmaPointComponent  implements OnInit {
  user_id: any;
  userDetails: any = {};
  fillSurveyList: Array<any> = [];
  disabled = false;
  fromDate='';
  toDate='';
  page: number = 1;
  pageSize: number = 10;
  total:any;
  
  constructor (private _userService:UserService, private _adminService:AdminService){
    
  }
  ngOnInit():void{
    this.user_id = localStorage.getItem('user_id') as string;
    this.getFillSurveyList();
    this.getDetails();
  }
  getFillSurveyList(){
    this._adminService.getKarmaPointHistory(this.page,this.pageSize,this.user_id).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.fillSurveyList = res.data;
          this.total=res.pagination.total;
        } else {
          this.fillSurveyList=[];
          this.total=0;
        }
      },error:(err:any)=>{
        console.log(err);
        this.fillSurveyList=[];
      }
    })
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getFillSurveyList();
  }


getDetails() {
  this._userService.getAllDetails(this.user_id).subscribe({
    next: (res: any) => {
      this.userDetails = res.data;
    }
  });
}
}
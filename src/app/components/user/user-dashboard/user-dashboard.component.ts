import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent  implements OnInit{
  user_id: any;
  allSurveyList: Array<any> = [];
  userDetails: any = {};

  constructor(
    private _toastrService: ToastrService,
    private _userService: UserService,
    private router: Router
  ) {
    console.log('constructor');
  }


  ngOnInit():void{
    this.user_id = localStorage.getItem('user_id') as string;
    this.getAllSurveyBasicDetailsList();
    this.getDetails();

  }

  getDetails() {
    this._userService.getAllDetails(this.user_id).subscribe({
      next: (res: any) => {
        this.userDetails = res.data;
      }
    });
  }

  getAllSurveyBasicDetailsList() {
    this._userService.getAllSurveyBasicDetailsList(this.user_id).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allSurveyList = res.data;
        } else {
          console.log(res);
        }
      },
      error: (err: any) => {
        console.log();
        this.allSurveyList = [];
      }
    });
  }
 
  statusEnableDisable(event:any ,id:any){
    let status=0;
    if (event.checked) {
      status=1
    }
    console.log(status,id);
    
    this._userService.surveyEnableDisable(id,status).subscribe({
      next:(res:any)=>{
        console.log(res);
        
        if(res.status==200){
          this._toastrService.clear();
          this._toastrService.success(res.message);
        }else{
          this._toastrService.clear();
          this._toastrService.warning(res.message);
        }
        this.getAllSurveyBasicDetailsList();
        this.getDetails();
      },
      error: (err: any) => {
        console.log(err);
        if (err.error.status == 401 || err.error.status == 422) {
          this._toastrService.clear();
          this._toastrService.warning(err.error.message);
        } else {
          this._toastrService.clear();
          this._toastrService.error('Internal Server Error');
        }
        this.getAllSurveyBasicDetailsList();
        this.getDetails();
      }
    })
  }


}

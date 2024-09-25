import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin/admin.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-survey',
  templateUrl: './user-survey.component.html',
  styleUrls: ['./user-survey.component.scss']
})
export class UserSurveyComponent implements OnInit {
  userDetails: any
  allLevelsList: Array<any> = [];
  user_id: any;
  constructor(private _adminService: AdminService,
    private _userService: UserService,
    private toasterService:ToastrService,
    private router:Router
  ) { }
  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id') as string;
    this.getAllLevelsList();
    this.getDetails();
  }
  getAllLevelsList() {
    this._adminService.getAllLevelsList(this.user_id).subscribe({
      next: (res: any) => {
        console.log('response', res);

        if (res.data.length > 0) {
          this.allLevelsList = res.data;
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
  convertString(value: any) {
    return parseInt(value)
  }
  //get User data...
  getDetails() {
    this._userService.getAllDetails(this.user_id).subscribe({
      next: (res: any) => {
        this.userDetails = res.data;
      }
    });
  }
  onClickSurveyCard() {
    this.router.navigate(['/user', { outlets: { user_menu: ['create-survey-list']}}]);
  }
  onYourKarmaPointLow(){
    this.toasterService.info("Sorry,Your karma points is low")
  }
}

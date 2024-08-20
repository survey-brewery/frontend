import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../admin/admin.service';
import { UserService } from '../../user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-fill-survey',
  templateUrl: './user-fill-survey.component.html',
  styleUrls: ['./user-fill-survey.component.scss']
})
export class UserFillSurveyComponent implements OnInit {
  levelList: Array<any> = [];
  begginer: any = {};
  expert: any = {};
  master: any = {};
  grandMaster: any = {};
  legend: any = {};
  user_id:any;
  userDetails:any={};
  constructor(private route: Router,
    private _adminService: AdminService,
    private _userService:UserService,
    private _toastr:ToastrService) {

  }
  ngOnInit(): void {
    this.user_id=localStorage.getItem('user_id')as string;
    this.getLevelList();
    this.getDetails();
  }
  getLevelList() {
    this._adminService.getAllLevelsList(this.user_id).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.levelList = res.data
          this.legend = res.data[4];
          this.grandMaster = res.data[3];
          this.master = res.data[2];
          this.expert = res.data[1];
          this.begginer = res.data[0];
        } else {

        }
      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }
  selectLevel(level_id: any,level:any,image:any,points_after_fill:any) {
    localStorage.setItem('level_id', level_id);
    localStorage.setItem('level', level);
    localStorage.setItem('image', image);
    localStorage.setItem('points_after_fill', points_after_fill);
    this.route.navigate(['/user', { outlets: { user_menu: ['fill-survey-list'] }}]);


    // this.route.navigate(['/user', { outlets: { user_menu: ['fill-survey', 'fill-survey-list'] }}]);

    // this.route.navigate(['/user', { outlets: { user_menu: ['fill-survey/fill-survey-list']}}])

  }
  getDetails(){
    this._userService.getAllDetails(this.user_id).subscribe({
      next:(res:any)=>{
        this.userDetails=res.data;
      }
    })
  }
  notAllowed(){
    this._toastr.info("There is No Sruvey Available");
  }
}

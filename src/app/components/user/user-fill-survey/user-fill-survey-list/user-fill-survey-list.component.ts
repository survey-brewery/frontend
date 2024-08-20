import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-user-fill-survey-list',
  templateUrl: './user-fill-survey-list.component.html',
  styleUrls: ['./user-fill-survey-list.component.scss']
})
export class UserFillSurveyListComponent implements OnInit {
  allSurveyList: Array<any> = [];
  maxToMin = 'false';
  level_id: any
  minToMax = 'false'
  user_id: any;
  userDetails:any={};
  level:any;
  image:any;
  isMinToMaxChecked=false;
  points_after_fill:any;
  page: number = 1;
  pageSize: number = 10;
  total:any;
  constructor(private _userService: UserService,private _toastr:ToastrService) {
  }

  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id') as string;
    this.level_id = localStorage.getItem('level_id') as string;
    this.level = localStorage.getItem('level') as string;
    this.image = localStorage.getItem('image') as string;
    this.points_after_fill = localStorage.getItem('points_after_fill') as string;
    this.getAllDetails();
    this.getSurveyListForFillSurvey();
  }
  getSurveyListForFillSurvey() {
    this._userService.getSurveyListForFillSurvey(this.user_id, this.maxToMin, this.minToMax,this.level_id).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.data.length > 0) {
          this.allSurveyList = res.data;
          this.total =this.allSurveyList.length
        }
      }
    })
  }
 getAllDetails(){
  this._userService.getAllDetails(this.user_id).subscribe({
    next:(res:any)=>{
      this.userDetails=res.data;
    }
  })
 }
  filterNoOfQuestions(event: any) {
    if (event.target.value == 'maxToMin') {
      this.maxToMin = 'true';
      this.minToMax = 'false';
    } else if (event.target.value == 'minToMax') {
      this.maxToMin = 'false';
      this.minToMax = 'true';
    }
    this.getSurveyListForFillSurvey();
  }
  noOfQuestions(event: any) {
    if (event.target.checked) {
      this.minToMax='true';
      this.isMinToMaxChecked=true
    } else {
      this.maxToMin='false';
      this.minToMax='false';
      this.isMinToMaxChecked=false; 
    }
    this.getSurveyListForFillSurvey();
  }
  getDaysRemaining(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end.getTime() - start.getTime();
    const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Convert milliseconds to days
    return daysRemaining;
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getSurveyListForFillSurvey();
  }
  
}

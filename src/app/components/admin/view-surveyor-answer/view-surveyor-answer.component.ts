import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserAnalyticsComponent } from '../users/user-analytics/user-analytics.component';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-view-surveyor-answer',
  templateUrl: './view-surveyor-answer.component.html',
  styleUrls: ['./view-surveyor-answer.component.scss']
})
export class ViewSurveyorAnswerComponent implements OnInit {
  fillSurveyDetails: any = {}
  userDetails:any = {};
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UserAnalyticsComponent>,
    private _userService: UserService
  ) {
    console.log(this.data?.survey_title);
    
    if (this.data.fill_survey_id != null) {
      this.fillSurveyViewById(this.data.fill_survey_id);
    }
  }
  ngOnInit(): void {

  }
  fillSurveyViewById(id: any) {
    this._userService.fillSurveyViewById(id).subscribe({
      next: (res: any) => {
        if (res.data) {
          this.fillSurveyDetails = res.data;
        }
      },
    });
  }
}

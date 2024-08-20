import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserFillSurveyRoutingModule } from './user-fill-survey-routing.module';
// import { UserFillSurveyListComponent } from './user-fill-survey-list/user-fill-survey-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    // UserFillSurveyListComponent
  ],
  imports: [
    CommonModule,
    UserFillSurveyRoutingModule,
    UserFillSurveyModule,
    SharedModule
  ],
  exports:[
    UserFillSurveyModule,
    UserFillSurveyRoutingModule,

  ]
})
export class UserFillSurveyModule { }

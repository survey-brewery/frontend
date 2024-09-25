import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserFillSurveyComponent } from './user-fill-survey/user-fill-survey/user-fill-survey.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserLevelComponent } from './user-level/user-level.component';
import { UserKarmaPointComponent } from './user-karma-point/user-karma-point.component';
import { UserSurveyComponent } from './user-survey/user-survey.component';
import { UserCreateSurveryListComponent } from './user-survey/user-create-survery-list/user-create-survery-list.component';
import { UserFillSurveyListComponent } from './user-fill-survey/user-fill-survey-list/user-fill-survey-list.component';
import { UserCreateSurveyComponent } from './user-survey/user-create-survey/user-create-survey.component';
import { UserFillSurveyStartComponent } from './user-fill-survey/user-fill-survey-start/user-fill-survey-start.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { UserSurveyAnalyticComponent } from './user-survey-analytic/user-survey-analytic.component';
// import { UserFillSurveyModule } from './user-fill-survey/user-fill-survey.module';


@NgModule({
  declarations: [
    UserDashboardComponent,
    UserFillSurveyComponent,
    UserProfileComponent,
    UserLevelComponent,
    UserKarmaPointComponent,
    UserSurveyComponent,
    UserCreateSurveryListComponent,
    UserFillSurveyListComponent,
    UserCreateSurveyComponent,
    UserFillSurveyStartComponent,
    HowItWorksComponent,
    UserSurveyAnalyticComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
  ]
})
export class UserModule { }

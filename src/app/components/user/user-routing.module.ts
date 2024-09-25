import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserFillSurveyComponent } from './user-fill-survey/user-fill-survey/user-fill-survey.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserLevelComponent } from './user-level/user-level.component';
import { UserKarmaPointComponent } from './user-karma-point/user-karma-point.component';
import { UserSurveyComponent } from './user-survey/user-survey.component';
import { UserCreateSurveryListComponent } from './user-survey/user-create-survery-list/user-create-survery-list.component';
import { UserCreateSurveyComponent } from './user-survey/user-create-survey/user-create-survey.component';
import { UserFillSurveyStartComponent } from './user-fill-survey/user-fill-survey-start/user-fill-survey-start.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { UserFillSurveyListComponent } from './user-fill-survey/user-fill-survey-list/user-fill-survey-list.component';
import { UserSurveyAnalyticComponent } from './user-survey-analytic/user-survey-analytic.component';

const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },

  {
    path: "dashboard",
    component: UserDashboardComponent,
    outlet: "user_menu",
    data: { title: 'Dashboard' }
  },

  {
    path: "my-profile",
    component: UserProfileComponent,
    outlet: "user_menu",
    data: { title: 'My Account' }
  },
  {
    path: "user-level",
    component: UserLevelComponent,
    outlet: "user_menu",
    data: { title: 'Level' }
  },
  {
    path: "karma-point",
    component: UserKarmaPointComponent,
    outlet: "user_menu",
    data: { title: 'Karma Points' }
  },
  {
    path: "survey",
    component: UserSurveyComponent,
    outlet: "user_menu",
    data: { title: 'Create Survey' }
  },
  {
    path: "create-survey-list",
    component: UserCreateSurveryListComponent,
    outlet: "user_menu",
    data: { title: 'Create Survey List' }
  },
  {
    path: "create-survey",
    component: UserCreateSurveyComponent,
    outlet: "user_menu",
    data: { title: 'Create Survey' }
  },
  {
    path: "fill-survey",
    component: UserFillSurveyComponent,
    outlet: "user_menu",
    data: { title: 'Fill Survey' },
  },
   {
      path: "fill-survey-list",
      component: UserFillSurveyListComponent,
      outlet: "user_menu",
      data: { title: 'Fill Survey List' }
    },
  {
    path: "fill-survey-start/:id",
    component: UserFillSurveyStartComponent,
    outlet: "user_menu",
    data: { title: 'Fill Survey Start' }
  },
  {
    path: "survey-analytic/:id",
    component: UserSurveyAnalyticComponent,
    outlet: "user_menu",
    data: { title: 'Create Survey- Analyze' }
  },
  {
    path: "how-it-works",
    component: HowItWorksComponent,
    outlet: "user_menu",
    data: { title: 'How to ?' }
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

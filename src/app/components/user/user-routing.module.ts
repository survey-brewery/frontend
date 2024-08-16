import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserFillSurveyComponent } from './user-fill-survey/user-fill-survey.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserLevelComponent } from './user-level/user-level.component';
import { UserKarmaPointComponent } from './user-karma-point/user-karma-point.component';
import { UserSurveyComponent } from './user-survey/user-survey.component';
import { UserCreateSurveryListComponent } from './user-survey/user-create-survery-list/user-create-survery-list.component';
import { UserFillSurveyListComponent } from './user-fill-survey/user-fill-survey-list/user-fill-survey-list.component';
import { UserCreateSurveyComponent } from './user-survey/user-create-survey/user-create-survey.component';

const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  // {
  //   path: "",
  //   component: UserDashboardComponent,
  //   // canActivate:[AuthGuard]
  // },
  {
    path: "dashboard",
    component: UserDashboardComponent,
    pathMatch: "full",
    outlet: "user_menu",
    // canActivate:[AuthGuard]
    title:'Dashboard',
    data: { title: 'Dahboard' }
  },
  {
    path: "fill-survey",
    component: UserFillSurveyListComponent,
    pathMatch: "full",
    outlet: "user_menu",
    // canActivate:[AuthGuard]
    data: { title: 'Fill survey' }
  },
    {
      path: "my-profile",  
      component: UserProfileComponent,
      pathMatch: "full",
      outlet: "user_menu",
      // canActivate:[AuthGuard]
      data: { title: 'My Profile' }
    },
    {
      path: "user-level",  
      component: UserLevelComponent,
      pathMatch: "full",
      outlet: "user_menu",
      // canActivate:[AuthGuard]
      data: { title: 'Level' }
    },
    {
      path: "karma-point",  
      component: UserKarmaPointComponent,
      pathMatch: "full",
      outlet: "user_menu",
      // canActivate:[AuthGuard]
      data: { title: 'Karma Point' }
    },
    {
      path: "survey",  
      component: UserSurveyComponent,
      pathMatch: "full",
      outlet: "user_menu",
      // canActivate:[AuthGuard]
      data: { title: 'Survey' }
    },
    {
      path: "create-survey-list",  
      component: UserCreateSurveryListComponent,
      pathMatch: "full",
      outlet: "user_menu",
      // canActivate:[AuthGuard]
      data: { title: 'Create survey list' }
    },
    {
      path: "create-survey",  
      component: UserCreateSurveyComponent,
      pathMatch: "full",
      outlet: "user_menu",
      // canActivate:[AuthGuard]
      data: { title: 'Create survey' }
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

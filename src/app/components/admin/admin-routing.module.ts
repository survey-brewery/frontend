import { createComponent, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UsersComponent } from './users/users.component';
import { LevelsComponent } from './masters/levels/levels.component';
import { PercentageComponent } from './masters/percentage/percentage.component';
import { ProfessionComponent } from './masters/profession/profession.component';
import { QuestionTypeComponent } from './masters/question-type/question-type.component';
import { SubProfessionComponent } from './masters/sub-profession/sub-profession.component';
import { RegionsComponent } from './masters/regions/regions.component';
import { ViewusersComponent } from './users/viewusers/viewusers.component';
import { CreateSurveyComponent } from './reports/create-survey/create-survey.component';
import { FillSurveyComponent } from './reports/fill-survey/fill-survey.component';
import { CreateComponent } from './create-survey/create/create.component';
import { UserAnalyticsComponent } from './users/user-analytics/user-analytics.component';

const routes: Routes = [
  { path: "", redirectTo: "admin", pathMatch: "full" },
  { path: "", 
    component: AdminDashboardComponent,
    // canActivate:[AuthGuard]
  },
  {
    path: "admin",
    component: AdminDashboardComponent,
    pathMatch: "full",
    outlet: "sub_menu",
    // canActivate:[AuthGuard]
  },
  //masters
  {
    path: "level",
    component: LevelsComponent,
    pathMatch: "full",
    outlet: "sub_menu",
    // canActivate:[AuthGuard]
  },
  {
    path: "percentage",
    component: PercentageComponent,
    pathMatch: "full",
    outlet: "sub_menu",
    // canActivate:[AuthGuard]
  },
  {
    path: "profession",
    component: ProfessionComponent,
    pathMatch: "full",
    outlet: "sub_menu",
    // canActivate:[AuthGuard]
  },
  {
    path: "question-type",
    component: QuestionTypeComponent,
    pathMatch: "full",
    outlet: "sub_menu",
    // canActivate:[AuthGuard]
  },
  {
    path: "sub-profession",
    component: SubProfessionComponent,
    pathMatch: "full",
    outlet: "sub_menu",
    // canActivate:[AuthGuard]
  },
  {
    path: "regions",
    component: RegionsComponent,
    pathMatch: "full",
    outlet: "sub_menu",
    // canActivate:[AuthGuard]
  },

  {
    path: "users",
    component: UsersComponent,
    pathMatch: "full",
    outlet: "sub_menu",
    // canActivate:[AuthGuard]
  },
  {
    path: "view-user",
    component: ViewusersComponent,
    pathMatch: "full",
    outlet: "sub_menu",
    // canActivate:[AuthGuard]
  },
  {
    path: "view-user/:id",
    component: ViewusersComponent,
    pathMatch: "full",
    outlet: "sub_menu",
    // canActivate:[AuthGuard]
  },
  {
    path: "create-survey",
    component: CreateSurveyComponent,
    pathMatch: "full",
    outlet: "sub_menu",
    // canActivate:[AuthGuard]
  },
  {
    path: "fill-survey",
    component: FillSurveyComponent,
    pathMatch: "full",
    outlet: "sub_menu",
    // canActivate:[AuthGuard]
  },
  {
    path: "create-survey-list",
    component: CreateComponent,
    pathMatch: "full",
    outlet: "sub_menu",
    // canActivate:[AuthGuard]
  },
  {
    path: "user-analytics/:id",
    component: UserAnalyticsComponent,
    pathMatch: "full",
    outlet: "sub_menu",
    // canActivate:[AuthGuard]
  },

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {  constructor(){
  console.log("hii");
  
} }

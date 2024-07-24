import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { FillSurveyComponent } from './fill-survey/fill-survey.component';

const routes: Routes = [
  { path: "", redirectTo: "user", pathMatch: "full" },
  {
    path: "",
    component: UserDashboardComponent,
    // canActivate:[AuthGuard]
  },
  {
    path: "user",
    component: UserDashboardComponent,
    pathMatch: "full",
    outlet: "user_Menu",
    // canActivate:[AuthGuard]
  },
  {
    path: "fill-survey",
    component: FillSurveyComponent,
    pathMatch: "full",
    outlet: "user_Menu",
    // canActivate:[AuthGuard]
  },
  //   {
  //     path: "patient",  
  //     component: PatientComponent,
  //     pathMatch: "full",
  //     outlet: "user_Menu",
  //     // canActivate:[AuthGuard]
  //   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

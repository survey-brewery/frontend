import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UsersComponent } from './users/users.component';
import { LevelsComponent } from './masters/levels/levels.component';
import { PercentageComponent } from './masters/percentage/percentage.component';
import { ProfessionComponent } from './masters/profession/profession.component';
import { QuestionTypeComponent } from './masters/question-type/question-type.component';

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
    path: "users",
    component: UsersComponent,
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

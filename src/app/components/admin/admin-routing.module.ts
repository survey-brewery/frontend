import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UsersComponent } from './users/users.component';

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
    outlet: "sub_Menu",
    // canActivate:[AuthGuard]
  },
  {
    path: "users",
    component: UsersComponent,
    pathMatch: "full",
    outlet: "sub_Menu",
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

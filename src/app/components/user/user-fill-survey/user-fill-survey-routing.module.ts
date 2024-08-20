import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFillSurveyListComponent } from './user-fill-survey-list/user-fill-survey-list.component';

const routes: Routes = [
  // { path: "", redirectTo: "fill-survey-list", pathMatch: "full" },
  // {
  //     path: "fill-survey-list",
  //     component: UserFillSurveyListComponent,
  //     data: { title: 'Fill Survey List' }
  //   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserFillSurveyRoutingModule { }

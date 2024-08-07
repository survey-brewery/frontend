import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UsersComponent } from './users/users.component';
import { LevelsComponent } from './masters/levels/levels.component';
import { AddUpdateLevelComponent } from './masters/levels/add-update-level/add-update-level.component';
import { PercentageComponent } from './masters/percentage/percentage.component';
import { AddUpdatePercentageComponent } from './masters/percentage/add-update-percentage/app-update-percentage.component';
import { ProfessionComponent } from './masters/profession/profession.component';
import { AddUpdateProfessionComponent } from './masters/profession/add-update-profession/add-update-profession.component';
import { QuestionTypeComponent } from './masters/question-type/question-type.component';
import { AddUpdateQuestionsTypeComponent } from './masters/question-type/add-update-questions-type/add-update-questions-type.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SubProfessionComponent } from './masters/sub-profession/sub-profession.component';
import { AddUpdateSubProfessionComponent } from './masters/sub-profession/add-update-sub-profession/add-update-sub-profession.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    UsersComponent,
    LevelsComponent,
    AddUpdateLevelComponent,
    PercentageComponent,
    AddUpdatePercentageComponent,
    ProfessionComponent,
    AddUpdateProfessionComponent,
    QuestionTypeComponent,
    AddUpdateQuestionsTypeComponent,
    SubProfessionComponent,
    AddUpdateSubProfessionComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { UserHeaderComponent } from '../sidebars/user-sidebar/user-header/user-header.component';


@NgModule({
  declarations: [
    // UserHeaderComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    // UserHeaderComponent
  ]
})
export class SharedModule { }

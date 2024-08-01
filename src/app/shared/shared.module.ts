import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { UserHeaderComponent } from '../sidebars/user-sidebar/user-header/user-header.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    // UserHeaderComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule
  ],
  exports: [
    CommonModule,    
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule
  ]
})
export class SharedModule { }

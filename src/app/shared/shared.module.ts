import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { UserHeaderComponent } from '../sidebars/user-sidebar/user-header/user-header.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    // UserHeaderComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatSlideToggleModule
  ],
  exports: [
    CommonModule,    
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatSlideToggleModule
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { UserHeaderComponent } from '../sidebars/user-sidebar/user-header/user-header.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NgChartsModule } from 'ng2-charts';




@NgModule({
  declarations: [
    // UserHeaderComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatPaginatorModule,
    NgChartsModule
    
    
  ],
  exports: [
    CommonModule,    
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatPaginatorModule,
    NgChartsModule
  
  ]
})
export class SharedModule { }

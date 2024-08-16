import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NgChartsModule } from 'ng2-charts';
import {MatIconModule} from '@angular/material/icon';



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
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatPaginatorModule,
    MatTabsModule,
    NgChartsModule,
    MatIconModule
    
    
  ],
  exports: [
    CommonModule,    
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatPaginatorModule,
    MatTabsModule,
    NgChartsModule,
    MatIconModule
  
  ]
})
export class SharedModule { }

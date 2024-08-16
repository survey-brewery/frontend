import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent {

  constructor(private router:Router,
   private renderer: Renderer2){
  }
  handleMasterAccordionClick(): void {
    const collapseTwo = document.getElementById('collapseTwo');
    const collapseThree = document.getElementById('collapseThree');
    this.renderer.removeClass(collapseTwo, 'show');
    this.renderer.removeClass(collapseThree, 'show');
  }
  handleSurveyAccordionClick(): void {
    const collapseOne = document.getElementById('collapseOne');
    const collapseThree = document.getElementById('collapseThree');
    this.renderer.removeClass(collapseOne, 'show');
    this.renderer.removeClass(collapseThree, 'show');
  }

  handleReportsAccordionClick(): void {
    const collapseOne = document.getElementById('collapseOne');
    const collapseTwo = document.getElementById('collapseTwo');
    this.renderer.removeClass(collapseOne, 'show');
    this.renderer.removeClass(collapseTwo, 'show');
  }

}

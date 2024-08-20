import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent  implements OnInit {
  constructor(private router:Router,
    private renderer: Renderer2){
   }

   ngOnInit(): void {
     
   }
   handleProfileAccordionClick(): void {
    //  const collapseTwo = document.getElementById('collapseTwo');
    //  const collapseThree = document.getElementById('collapseThree');
    //  this.renderer.removeClass(collapseTwo, 'show');
    //  this.renderer.removeClass(collapseThree, 'show');
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

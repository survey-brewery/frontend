import { Component } from '@angular/core';

@Component({
  selector: 'app-user-create-survey',
  templateUrl: './user-create-survey.component.html',
  styleUrls: ['./user-create-survey.component.scss']
})
export class UserCreateSurveyComponent {
  allRegionsList:Array<any>=[{
    region_id:1,
    region:"Maharashtra"
  },{
    region_id:1,
    region:"Goa"
  },
  {
    region_id:1,
    region:"Karanataka"
  }];

  changeTab(tab_name:any){
    for (let i = 0; i < document.querySelectorAll('.mdc-tab__text-label').length; i++) {
      if ((<HTMLElement>document.querySelectorAll('.mdc-tab__text-label')[i]).innerText == tab_name) {
        (<HTMLElement>document.querySelectorAll('.mdc-tab__text-label')[i]).click()
      }
    }
  }
}

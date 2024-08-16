import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-fill-survey-list',
  templateUrl: './user-fill-survey-list.component.html',
  styleUrls: ['./user-fill-survey-list.component.scss']
})
export class UserFillSurveyListComponent implements OnInit {
  user_id: any;
  userDetails: any = {};
  allLevelsList:Array<any>=[
    {
      "level_image":'../../../../assets/user/level/level-legend.svg',
      "level":"Legend",
      "criteria":">1001",
      "fill_survey":"+50",
      "create_survey":"-100",
    },
    {
      "level_image":'../../../../assets/user/level/level-grand-master.svg',
      "level":"Grand Master",
      "criteria":"751 to 1000",
      "fill_survey":"+40",
      "create_survey":"-80",
    },
    {
      "level_image":'../../../../assets/user/level/level-master.svg',
      "level":"Master",
      "criteria":"501 to 750",
      "fill_survey":"+30",
      "create_survey":"-60",
    },
    {
      "level_image":'../../../../assets/user/level/level-expert.svg',
      "level":"Expert",
      "criteria":"251 to 500",
      "fill_survey":"+20",
      "create_survey":"-40",
    },
    {
      "level_image":'../../../../assets/user/level/level-beginner.svg',
      "level":"Begginer",
      "criteria":"0 to 250",
      "fill_survey":"+10",
      "create_survey":"-20",
    },
    
  ]
  constructor (private _userService:UserService){
    
  }
  ngOnInit():void{
    this.user_id = localStorage.getItem('user_id') as string;
    this.getDetails();
  }
  


getDetails() {
  this._userService.getAllDetails(this.user_id).subscribe({
    next: (res: any) => {
      this.userDetails = res.data;
    }
  });
}
}
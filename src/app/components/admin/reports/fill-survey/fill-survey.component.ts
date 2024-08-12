import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-fill-survey',
  templateUrl: './fill-survey.component.html',
  styleUrls: ['./fill-survey.component.scss']
})
export class FillSurveyComponent {
  user_id='';
  userDetails : any = {};
  AllFillSurveyList:Array<any>=[];
  fromDate='';
  toDate='';
  page=1
  pageSize=10
  total:any
    
  constructor(
    private _adminService: AdminService,
    private url: ActivatedRoute,
   
  ) {}
  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id') as string
    this.getAllFillSurveyList();
  }
  getAllFillSurveyList() {
    this._adminService.getFillSurveyList(this.fromDate,this.toDate,'',this.page,this.pageSize).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.AllFillSurveyList = res.data
          this.total=res.pagination.total;
        } else {
          this.AllFillSurveyList = [];
          this.total=0;
        }
      },
     error:(err:any)=>{
     this.total=0;
     this.AllFillSurveyList=[];
 }
})
}
filter(fromDate:any,toDate:any){
  this.fromDate=fromDate;
  this.toDate=toDate;
  if(this.fromDate!=''&&this.toDate!=''){
    this.getAllFillSurveyList();
  }
}
onPageChangeFillSurvey(event: PageEvent): void {
  this.page = event.pageIndex + 1;
  this.pageSize = event.pageSize;
  this.getAllFillSurveyList();
}

}

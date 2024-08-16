import { Component ,OnInit} from '@angular/core';
import { AdminService } from '../../admin.service';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.scss']
})
export class CreateSurveyComponent implements OnInit {
  user_id='';
  userDetails : any = {};
  allCreateSurveyList:Array<any>=[];
  fromDate='';
  toDate='';
  page=1;
  pageSize=10
  total:any
    
  constructor(
    private _adminService: AdminService,
    private url: ActivatedRoute,
   
  ) {}
  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id') as string
    this.getAllCreateSurveyList();
  }
  getAllCreateSurveyList() {
    this._adminService.getCreateSurveyList(this.fromDate,this.toDate,null,this.page,this.pageSize).subscribe({
      next: (res: any) => {
        
        if (res.data.length > 0) {
          this.allCreateSurveyList = res.data
          this.total=res.pagination.total;
        } else {
          this.allCreateSurveyList=[];
          this.total=0;
        }
      },
     error:(err:any)=>{
     this.total=0;
     this.allCreateSurveyList=[];
 }
})
}
filter(fromDate:any,toDate:any){
  this.fromDate=fromDate;
  this.toDate=toDate;
  if(this.fromDate!=''&&this.toDate!=''){
    this.getAllCreateSurveyList();
    
  }
}
onPageChangeCreateSurvey(event: PageEvent): void {
  this.page = event.pageIndex + 1;
  this.pageSize = event.pageSize;
  this.getAllCreateSurveyList();
}
}

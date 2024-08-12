import { Component} from '@angular/core';
import { AdminService } from '../../admin.service';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-viewusers',
  templateUrl: './viewusers.component.html',
  styleUrls: ['./viewusers.component.scss']
})
export class ViewusersComponent {
  user_id: any;
  userDetails : any = {};
  allCreateSurveyList:Array<any>=[];
  AllFillSurveyList:Array<any>=[];
  page: number = 1;
  pageSize: number = 10;
  total:any;
  pageCreate: number = 1;
  pageSizeCreate: number = 10;
  totalCreate:any;
     
  constructor(
    private _adminService: AdminService,
    private url: ActivatedRoute,
   
  ) { }
  ngOnInit(): void {

    this.user_id = this.url.snapshot.params['id']
    this.getUsersDetails(this.user_id);
    this.getAllCreateSurveyList();
    this.getFillSurveyList();
  }
  getUsersDetails(id: any) {
    this._adminService.getUserDetailsById(id).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.userDetails = res.data[0];
        }
      }
    })
  }
  getAllCreateSurveyList() {
    this._adminService.getCreateSurveyList('','',this.user_id,this.pageCreate,this.pageSizeCreate).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allCreateSurveyList = res.data
        
          this.totalCreate=res.pagination.total;
        } else {
          this.allCreateSurveyList = [];
          this.totalCreate=0;
        }
      },
     error:(err:any)=>{
     this.allCreateSurveyList=[];
 }
})
}
  onPageChangeCreateSurvey(event: PageEvent): void {
    this.pageCreate = event.pageIndex + 1;
    this.pageSizeCreate = event.pageSize;
    this.getAllCreateSurveyList();
  }
  getFillSurveyList() {
    this._adminService.getFillSurveyList('','',this.user_id,this.page,this.pageSize).subscribe({
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
       this.AllFillSurveyList=[];
      }
    })
  }
  onPageChangeFillSurvey(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getFillSurveyList();
  }
 
}

import { Component } from '@angular/core';
import { UserService } from '../../user/user.service';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-create-survey-list',
  templateUrl: './admin-create-survey-list.component.html',
  styleUrls: ['./admin-create-survey-list.component.scss']
})
export class AdminCreateSurveyListComponent {
  allSurveyList: Array<any> = [];
  disabled = false;
  user_id = '';
  page: number = 1;
  pageSize: number = 10;
  total:any;
  constructor(private _UserService: UserService, private toastrService: ToastrService
  ) {
  }
  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id') as string
    this.getSurveyBasicDetailsList();
  }
    getSurveyBasicDetailsList(){
      this._UserService.getAllSurveyBasicDetailsList(this.user_id,this.page,this.pageSize).subscribe({
        next: (res: any) => {
          if (res.data.length > 0) {
            this.allSurveyList = res.data;
            console.log(this.allSurveyList)
            this.total=res.pagination.total;
          } else {
            this.allSurveyList=[];
            this.total=0;
          }
        },
        error:(err:any)=>{
          console.log();
          this.allSurveyList=[]
        }
      })
    }
    statusEnableDisable(event:any ,id:any){
      let status=0;
      if (event.checked) {
        status=1
      }
      this._UserService.surveyEnableDisable(id,status).subscribe({
        next:(res:any)=>{
          if(res.status==200){
            this.toastrService.clear();
            this.toastrService.success(res.message);
          }else{
            this.toastrService.clear();
            this.toastrService.warning(res.message);
          }
          this.getSurveyBasicDetailsList();
  
        },
        error: (err: any) => {
          if (err.error.status == 401 || err.error.status == 422) {
            this.toastrService.clear();
            this.toastrService.warning(err.error.message);
          } else {
            this.toastrService.clear();
            this.toastrService.error('Internal Server Error');
          }
          this.getSurveyBasicDetailsList();
  
        }
      })
    }
    onPageChange(event: PageEvent): void {
      this.page = event.pageIndex + 1;
      this.pageSize = event.pageSize;
      this.getSurveyBasicDetailsList();
    }

}

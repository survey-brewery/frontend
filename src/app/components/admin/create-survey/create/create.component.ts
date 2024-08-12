import { Component } from '@angular/core';
import { AdminService } from '../../admin.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/components/user/user.service';
import { PageEvent } from '@angular/material/paginator';
import { AddUpdateLevelComponent } from '../../masters/levels/add-update-level/add-update-level.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  allSurveyList: Array<any> = [];
  disabled = false;
  user_id = '';
  page: number = 1;
  pageSize: number = 10;
  total:any;
  constructor(private dialog: MatDialog, private _UserService: UserService, private toastrService: ToastrService
  ) {
  }
  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id') as string
    this.getSurveyBasicDetailsList();
  }
  openDialog(data?: any) {
    const dialogRef = this.dialog.open(AddUpdateLevelComponent, {
      data: data,
      width: '744px',
      panelClass:'mat-dialog-container'
    });

    dialogRef.afterClosed().subscribe((message: string) => {
      if (message == 'create' || message == 'update') {
        this.getSurveyBasicDetailsList();
      } else {
        console.log('nothing happen');
      }
    });}
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

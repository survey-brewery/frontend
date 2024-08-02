import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../admin.service';
import { ToastrService } from 'ngx-toastr';
import { AddUpdateQuestionsTypeComponent } from './add-update-questions-type/add-update-questions-type.component';

@Component({
  selector: 'app-question-type',
  templateUrl: './question-type.component.html',
  styleUrls: ['./question-type.component.scss']
})
export class QuestionTypeComponent {
  allQuestionList: Array<any> = [];
  constructor(
    private dialog: MatDialog,
    private _adminService: AdminService,
    private _tosterService: ToastrService
  ) { }
  ngOnInit(): void {
    this.getQuestionList();
  }
  openDialog(data?: any) {
    const dialogRef = this.dialog.open(AddUpdateQuestionsTypeComponent, {
      data: data,
      width: '744px',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe((message: string) => {
      if (message == 'create' || message == 'update') {
        this.getQuestionList();
      } else {
        console.log('nothing happen');
      }
    });
  }
  getQuestionList() {
    this._adminService.getAllQuestionsTypeList().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allQuestionList = res.data
        } else {
          this.allQuestionList = []
        }
      }
    })
  }
  deleteQuetionType(id:any) {
    this._adminService.deleteQuestionTypeById(id).subscribe({
      next: (res: any) => {
        if (res.status == 201) {
          this._tosterService.success(res.message);
          this.getQuestionList();

        } else {
          this._tosterService.warning(res.massage)
        }
      },
      error: (err: any) => {
        if (err.error.status == 401 || err.error.status == 422) {
          this._tosterService.warning(err.error.message);
        } else {
          this._tosterService.error('Internal Server Error');
        }
      }
    })
   }
  }



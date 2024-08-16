import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../admin.service';
import { ToastrService } from 'ngx-toastr';
import { AddUpdateSubProfessionComponent } from './add-update-sub-profession/add-update-sub-profession.component';

@Component({
  selector: 'app-sub-profession',
  templateUrl: './sub-profession.component.html',
  styleUrls: ['./sub-profession.component.scss']
})
export class SubProfessionComponent {
  allgetSubProfessionList: Array<any> = [];
  user_id:any
  constructor(
    private dialog: MatDialog,
    private _adminService: AdminService,
    private _toastrService:ToastrService
  ) { }
  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id') as string;
    this.getSubProfessionList();
  
  }
  openDialog(data?: any) {
    const dialogRef = this.dialog.open(AddUpdateSubProfessionComponent, {
      data: data,
      width: '744px',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe((message: string) => {
      if (message == 'create' || message == 'update') {
        this.getSubProfessionList();
      } else {
        console.log('nothing happen');
      }
    });
  }
  getSubProfessionList() {
    this._adminService.getAllSubProfessionsList('','').subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allgetSubProfessionList = res.data
        } else {
          this.allgetSubProfessionList = []
        }
      }
    })
  }
  deleteSubProfession(id:any) {
    this._adminService.deleteSubProfessionById(id).subscribe({
      next: (res: any) => {
        if (res.status == 201) {
          this._toastrService.success(res.message);
          this.getSubProfessionList();

        } else {
          this._toastrService.warning(res.massage)
        }
      },
      error: (err: any) => {
        if (err.error.status == 401 || err.error.status == 422) {
          this._toastrService.warning(err.error.message);
        } else {
          this._toastrService.error('Internal Server Error');
        }
      }
    })
   }
  
}

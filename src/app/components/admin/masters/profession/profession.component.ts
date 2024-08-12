import { Component } from '@angular/core';
import { AddUpdateProfessionComponent } from './add-update-profession/add-update-profession.component';
import { AdminService } from '../../admin.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profession',
  templateUrl: './profession.component.html',
  styleUrls: ['./profession.component.scss']
})
export class ProfessionComponent {
  allProfessionList: Array<any> = [];
  constructor(
    private dialog: MatDialog,
    private _adminService: AdminService,
    private _toastrService:ToastrService
  ) { }
  ngOnInit(): void {
    this.getProfessionList();
  
  }
  openDialog(data?: any) {
    const dialogRef = this.dialog.open(AddUpdateProfessionComponent, {
      data: data,
      width: '744px',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe((message: string) => {
      if (message == 'create' || message == 'update') {
        this.getProfessionList();
      } else {
        console.log('nothing happen');
      }
    });
  }
  getProfessionList() {
    this._adminService.getAllProfessionsList('','').subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allProfessionList = res.data
        } else {
          this.allProfessionList = []
        }
      }
    })
  }
  deleteProfession(id:any) {
    this._adminService.deleteProfessionById(id).subscribe({
      next: (res: any) => {
        if (res.status == 201) {
          this._toastrService.success(res.message);
          this.getProfessionList();

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

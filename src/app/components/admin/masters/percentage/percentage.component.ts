import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../admin.service';
import { AddUpdatePercentageComponent } from './add-update-percentage/app-update-percentage.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-percentage',
  templateUrl: './percentage.component.html',
  styleUrls: ['./percentage.component.scss']
})
export class PercentageComponent {
  allPercentageList: Array<any> = [];

  constructor(
    private dialog: MatDialog,
    private _adminService: AdminService,
    private _tosterService: ToastrService
  ) { }
  ngOnInit(): void {
    this.getPercentageList();
  }
  openDialog(data?: any) {
    const dialogRef = this.dialog.open(AddUpdatePercentageComponent, {
      data: data,
      width: '744px',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe((message: string) => {
      if (message == 'create' || message == 'update') {
        this.getPercentageList();
      } else {
        console.log('nothing happen');
      }
    });
  }
  getPercentageList() {
    this._adminService.getAllPercentagesList('','').subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allPercentageList = res.data
        } else {
          this.allPercentageList = []
        }
      }
    })
  }
  changeEvent(event: any, id: any) {
    let status = 0;
    if (event.checked) {
      status = 1;
    }
    this._adminService.percentageEnableDisable(id, status).subscribe({
      next: (res: any) => {
        if (res.status === 200) {
          this._tosterService.success(res.message);
          this.getPercentageList();
        } else {
          this._tosterService.warning(res.message);
        }
      },
      error: (error: any) => {
        if (error.status == 422) {
          this._tosterService.warning(error.message);
        } else {
          this._tosterService.error("Internal server error");
        }
      },
    })
  }
}

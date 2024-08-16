import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../admin.service';
import { ToastrService } from 'ngx-toastr';
import { AddUpdateRegionsComponent } from './add-update-regions/add-update-regions.component';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.scss']
})
export class RegionsComponent {
  allRegionsList: Array<any> = [];
  constructor(
    private dialog: MatDialog,
    private _adminService: AdminService,
    private _toastrService:ToastrService
  ) { }
  ngOnInit(): void {
    this.getRegionsList();
  
  }
  openDialog(data?: any) {
    const dialogRef = this.dialog.open(AddUpdateRegionsComponent, {
      data: data,
      width: '744px',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe((message: string) => {
      if (message == 'create' || message == 'update') {
        this.getRegionsList();
      } else {
        console.log('nothing happen');
      }
    });
  }
  getRegionsList() {
    this._adminService.getAllRegionsList('','').subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allRegionsList = res.data
        } else {
          this.allRegionsList = []
        }
      }
    })
  }
  deleteRegions(id:any) {
    this._adminService.deleteRegionById(id).subscribe({
      next: (res: any) => {
        if (res.status == 201) {
          this._toastrService.success(res.message);
          this.getRegionsList();

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

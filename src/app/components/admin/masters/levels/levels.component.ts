import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/components/admin/admin.service'
import { AddUpdateLevelComponent } from './add-update-level/add-update-level.component';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.scss']
})
export class LevelsComponent implements OnInit {
  allLevelsList: Array<any> = [];

  constructor(
    private dialog: MatDialog, 
    private adminService: AdminService,
  ) { }
  ngOnInit(): void {
    this.getAllLevelsList();
  }
  openDialog(data?: any) {
    const dialogRef = this.dialog.open(AddUpdateLevelComponent, {
      data: data,
      width: '744px',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe((message: string) => {
      if (message == 'create' || message == 'update') {
        this.getAllLevelsList();
      } else {
        console.log('nothing happen');
      }
    });
  }
  getAllLevelsList() {
    this.adminService.getAllAdminLevelsList().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allLevelsList = res.data
        } else {
          this.allLevelsList = []
        }
      }
    })
  }
}

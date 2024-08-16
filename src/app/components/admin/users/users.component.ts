import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../admin.service';
import { ViewusersComponent } from './viewusers/viewusers.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  allUsersList: Array<any> = [];
  constructor(
    private dialog: MatDialog,
    private _adminService: AdminService,
  ) { }
  ngOnInit(): void {
    this.getUsersList();

  }
  openDialog(data?: any) {
    const dialogRef = this.dialog.open(ViewusersComponent, {
      data: data,
      width: '744px',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe((message: string) => {
      if (message == 'create' || message == 'update') {
        this.getUsersList();
      } else {
        console.log('nothing happen');
      }
    });
  }
  getUsersList() {
    this._adminService.allUserList('','').subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allUsersList = res.data
        } else {
          this.allUsersList = []
        }
      }
    })
  }

}

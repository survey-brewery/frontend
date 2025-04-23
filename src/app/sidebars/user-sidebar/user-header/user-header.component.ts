import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { UserContactComponent } from 'src/app/components/user/user-contact/user-contact.component';
import { UserService } from 'src/app/components/user/user.service';
import { DataSharedService } from 'src/app/shared/data-shared.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit {
  title = 'Dashboard';
  userDetails:any={};
  user_id:any;
  constructor( private router: Router, 
    private _userService: UserService,
    private _sharedService:DataSharedService,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id') as string;
    // this.getDetails()
    this._sharedService.karmaPoint$.subscribe((res:any)=>{
      if (res) {
        this.getDetails();
      }
    })
    this.getDetails()
   this.getRoutingTitle();
  }
  //get routing title...
  getRoutingTitle(){
    let route: ActivatedRoute = this.router.routerState.root;
    let routeTitle = '';
    while (route!.firstChild) {
      route = route.firstChild;
    }
    if (route.snapshot.data['title']) {
      routeTitle = route!.snapshot.data['title'];
    }
    this.title = routeTitle
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route: ActivatedRoute = this.router.routerState.root;
          let routeTitle = '';
          while (route!.firstChild) {
            route = route.firstChild;
          }
          if (route.snapshot.data['title']) {
            routeTitle = route!.snapshot.data['title'];
          }
          return routeTitle;
        })
      )
      .subscribe((title: string) => {
        if (title) {
          this.title = title
        }
      });
  }
  //get User data...
  getDetails() {
    this._userService.getAllDetails(this.user_id).subscribe({
      next: (res: any) => {
        this.userDetails = res.data;
      }
    });
  }
  // open dialog
  openDialog(data?: any) {
    const dialogRef = this.dialog.open(UserContactComponent, {
      data: data,
      width: 'auto',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe((message: string) => {
      if (message == 'create' || message == 'update') {
      } else {
        console.log('nothing happen');
      }
    });
  }
}

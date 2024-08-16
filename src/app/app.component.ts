import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentChecked {
  
  title = 'survey-brewery-app';
  isAdminDashboard = false;
  isUserDashboard = false;
  constructor(
    private router: Router,
    // private _sharedService: SharedService,
    // private _toastrService: ToastrService
  ) {
  }
  ngOnInit(): void {
  }
  ngAfterContentChecked() {
    let currentRoute = this.router.routerState.snapshot.url;
    if (currentRoute == "/login" || currentRoute == "/auth" || currentRoute == "/auth/sign-up") {
      this.isAdminDashboard = false;
      this.isUserDashboard = false;
    } else if (currentRoute?.split('/')[1] == 'admin') {
      this.isAdminDashboard = true;
      this.isUserDashboard = false;
    } else if (currentRoute?.split('/')[1] == 'user') {
      this.isUserDashboard = true;
      this.isAdminDashboard = false;
    }
  }



}

import { AfterContentChecked, Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements  AfterContentChecked {
  constructor(
    private router: Router, private activatedRoute: ActivatedRoute){}

  ngAfterContentChecked(): void {
  //  let currentRoute = this.router.routerState.snapshot.url;
  //  console.log(this.router);
 

   
    // if (currentRoute == "/login" || currentRoute == "/auth" || currentRoute == "/auth/sign-up") {
    // } else if (currentRoute?.split('/')[1] == 'admin') {
    // } else if (currentRoute?.split('/')[1] == 'user') {
    // }
  }

}

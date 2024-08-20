import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit, AfterContentChecked {
  title = 'Dashboard'
  constructor(
    private router: Router, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    
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
  ngAfterContentChecked(): void {
    //  let currentRoute = this.router.routerState.snapshot.url;
    //  console.log(this.router);


    // if (currentRoute == "/login" || currentRoute == "/auth" || currentRoute == "/auth/sign-up") {
    // } else if (currentRoute?.split('/')[1] == 'admin') {
    // } else if (currentRoute?.split('/')[1] == 'user') {
    // }
  }

}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { SharedModule } from './shared/';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AdminSidebarComponent } from './sidebars/admin-sidebar/admin-sidebar.component';
import { UserSidebarComponent } from './sidebars/user-sidebar/user-sidebar.component';
import { UserHeaderComponent } from './sidebars/user-sidebar/user-header/user-header.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './shared/auth.interceptor';
const APP_CONTAINERS = [
  UserHeaderComponent,
  AdminSidebarComponent,
  UserSidebarComponent,
];
@NgModule({
  declarations: [
    AppComponent, ...APP_CONTAINERS
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // SharedModule,
    ToastrModule.forRoot({
      timeOut: 6000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton:true
    }), // ToastrModule added
    HttpClientModule,
  ],
  providers: [{  
    provide: HTTP_INTERCEPTORS,  
    useClass: AuthInterceptor,  
    multi: true  
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }

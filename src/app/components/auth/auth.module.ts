import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PostSignUpComponent } from './post-sign-up/post-sign-up.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    PostSignUpComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }

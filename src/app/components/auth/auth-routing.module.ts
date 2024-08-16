import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PostSignUpComponent } from './post-sign-up/post-sign-up.component';
import { SignUpComponent } from './sign-up/sign-up.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
    pathMatch: "full",
  },
  {
    path: "sign-up",
    component: SignUpComponent,
    pathMatch: "full",
  },
  {
    path: "post-sign-up",
    component: PostSignUpComponent,
    pathMatch: "full",
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
  constructor(){
    console.log("hii");
    
  }
}

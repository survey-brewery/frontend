import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SurveyService } from '../auth.service';
import { DataSharedService } from 'src/app/shared/data-shared.service';

declare var google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  latitude!: number;
  longitude!: number;
  auth2: any;
  ngZone: any;
  constructor(private fb: FormBuilder, 
    private router: Router, 
    private surveyService: SurveyService, 
    private toastrService: ToastrService,
    private _dataSharedService:DataSharedService) { }
  ngOnInit(): void {
 
    
    this.createForm();
  }
  createForm() {
    this.getLocation();
    this.loginForm = this.fb.group({
      email_id: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })

  }
  get control() {
    return this.loginForm.controls;
  }

  handleGoogleSignIn(response: any) {

    // This next is for decoding the idToken to an object if you want to see the details.
    let base64Url = response.credential.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    console.log(JSON.parse(jsonPayload));
    let userData=JSON.parse(jsonPayload);
    console.log(userData.email);
    if (userData.email) {
      let email={
        "email_id":userData.email
      }
      this.surveyService.loginWithGoogle(email).subscribe({
        next: (res: any) => {
          localStorage.setItem("user_id",(res.data.userData.user_id));
          localStorage.setItem('accessToken', res.data.token);
          localStorage.setItem('expiresin', res.data.expiresin);
          this._dataSharedService.sendUserData(res.data.userData);
          localStorage.setItem("userData", JSON.stringify(res.data.userData));
          this.router.navigate(['/admin', { outlets: { sub_menu: ['admin']}}]);
          // if (res.data.category==1) {
          // this.router.navigate(['/admin', { outlets: { sub_menu: ['admin']}}]);
          // } else {
          // this.router.navigate(['/user'])
          // }
          this.toastrService.clear();
          this.toastrService.success(res.message);
        },
        error: (err: any) => {
          if (err.error.status == 401 || err.error.status == 422) {
          // generate 6 digit  random number 
          let randomNumber=Math.floor(100000 + Math.random() * 900000)
          let Data={
            "email": userData.email,
            "setPassword":randomNumber,
            "full_name":userData.name,
            "user_name":userData.given_name
        }
        const userDataString = JSON.stringify(Data);
        localStorage.setItem('userData', userDataString);
        // this.router.navigate(['/post-sign-up']);
          } else {
            this.toastrService.clear();
            this.toastrService.error('Internal Server Error');
          }
        }
      })
    } else {
      
    }
    
  }
  
  ngAfterViewInit(): void {
    const self = this;
  
    google.accounts.id.initialize({
      client_id: "209541354842-gtq7tnt9hrcms0viudkdknoncbtpnt00.apps.googleusercontent.com",
      callback: function(response: any) {
        self.handleGoogleSignIn(response);
        
      }
    });
  
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      {
        size: "large",
        type: "standard",
        theme: "filled",
        text: "Continue with Google"
      }
    );
    
  }
  
  

  
 
  
  
  
  
  onSubmit() {
    if (this.loginForm.valid) {
      this.surveyService.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          console.log('res',res);
          
          localStorage.setItem("user_id",(res.data.userData.user_id));
          localStorage.setItem('accessToken', res.data.token);
          localStorage.setItem('expiresin', res.data.expiresin);
          this._dataSharedService.sendUserData(res.data.userData);
          localStorage.setItem("userData", JSON.stringify(res.data.userData));
          
          if (res.data.category==1) {
            this.router.navigate(['/admin', { outlets: { sub_menu: ['admin']}}]);
          } else {
          this.router.navigate(['/user'])
          }
          this.toastrService.clear();
          this.toastrService.success(res.message);
        },
        error: (err: any) => {
          console.log('res',err);

          if (err.error.status == 401 || err.error.status == 422) {
            this.toastrService.clear();
            this.toastrService.warning(err.error.message);
          } else {
            this.toastrService.clear();
            this.toastrService.error('Internal Server Error');
          }
        }
      })
    } else {
      this.loginForm.markAllAsTouched();
      this.toastrService.warning('fill required fields');
    }
  }
  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
      
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
}

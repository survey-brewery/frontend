import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SurveyService } from '../../auth/auth.service';
import { DataSharedService } from 'src/app/shared/data-shared.service';
import { UserService } from '../user.service';
import { LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent  implements OnInit {
  userDetails:any={};
  form!:FormGroup
  allProfessionList:Array<any>=[];
  allSubProfessionList:Array<any>=[];
  allRegionsList:Array<any>=[];
  filteredRegionList:Array<any>=[];
  allGenderList: Array<any> = [
    {
      gender_id: 1,
      gender: 'Male'
    },
    {
      gender_id: 2,
      gender: 'Female'
    },
    {
      gender_id: 3,
      gender: 'Other'
    }
  ]
  searchRegionValue=''
  profession='';
  user_id:any;
  user:any={}
  constructor(private fb:FormBuilder,private _adminService:AdminService,private _toastrService:ToastrService,
    private router:Router,
    private _surveyService:SurveyService,
    private _dataSharedService:DataSharedService,
    private _userService:UserService){

  }

  ngOnInit(): void {
  this.user_id = localStorage.getItem('user_id') as string;
  this.createForm();
  this.getAllProfessionList();
    this.getAllRegionsList();
    this.getUserDetailsById(this.user_id);
    this.getDetails()
  }
  createForm(){
    this.form=this.fb.group({
    user_name:[null,Validators.required],
    full_name:[null,Validators.required],
    email_id:[null,Validators.required],
    gender:[null,Validators.required],
    region_id:[null,Validators.required],
    profession_id:[null,Validators.required],
    sub_profession_id:[]
    });
  }
  get controls(){
    return this.form.controls;
  }
  getUserDetailsById(id:any){
    this._adminService.getUserDetailsById(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        if (res.data.length>0) {
          this.userDetails=res.data[0];
          this.controls['user_name'].patchValue(this.userDetails.user_name);
          this.controls['full_name'].patchValue(this.userDetails.full_name);
          this.controls['gender'].patchValue(parseInt(this.userDetails.gender));
          this.controls['profession_id'].patchValue(this.userDetails.profession_id);
          this.controls['region_id'].patchValue(this.userDetails.region_id);
          this.controls['email_id'].patchValue(this.userDetails.email_id);
          console.log(this.userDetails.profession);
          if (this.userDetails.profession) {
            this.getsubProfessionListByProfessionId()
            this.profession=new LowerCasePipe().transform(this.userDetails.profession)
            this.controls['sub_profession_id'].patchValue(this.userDetails.sub_profession_id);
          }
        }
      },
    error:(err:any)=>{
      console.log(err);
      
    }
    })
  }
    //get all  profession list for admin where adminid is 1 it is static...
    getAllProfessionList(){
      this._adminService.getAllProfessionsList('','').subscribe({
        next:(res:any)=>{
          console.log(res);
          if (res.data.length>0) {
            this.allProfessionList=res.data;
          }
        }
      })
    }
    //get all  regions list for admin where adminid is 1 it is static...
    getAllRegionsList(){
      this._adminService.getAllRegionsList('','').subscribe({
        next:(res:any)=>{
          if (res.data.length>0) {
            this.allRegionsList=res.data;
            this.filteredRegionList= this.allRegionsList;
          }
        }
      })
    }

    filterRegion() {
      if (this.searchRegionValue != "") {
        this.filteredRegionList = [];
        const filteredArr = this.allRegionsList.filter((obj) =>
        obj.region.toLowerCase().includes(this.searchRegionValue)
        );
        this.filteredRegionList = filteredArr;
      } else {
        this.filteredRegionList= this.allRegionsList;
      }
    }
    getsubProfessionListByProfessionId(){
      let id=this.controls['profession_id'].value;
      this.controls['sub_profession_id'].patchValue(0)
      this.profession=''
      this._adminService.subProfessionListByProfessionId(id).subscribe({
        next:(res:any)=>{
          if (res.data.length>0) {
            this.allSubProfessionList=res.data;
            this. profession=new LowerCasePipe().transform(this.allSubProfessionList[0].profession)
          }
        }
      })
    }
    getDetails() {
      this._userService.getAllDetails(this.user_id).subscribe({
        next: (res: any) => {
          this.user = res.data;
        }
      });
    }
    userSave(){
      let form=this.form.value;
      if (this.form.valid) {
        this._surveyService.updateUser(this.form.value,this.user_id).subscribe({
          next: (res: any) => {
            if (res.status == 200) {
              this._toastrService.success(res.message);
              this._dataSharedService.sendUserData(res.userData);
              localStorage.setItem("userData", JSON.stringify(res.userData));
              this.router.navigate(['/user', { outlets: { user_menu: ['dashboard']}}])
            } else {
              this._toastrService.warning(res.message);
            }
          },
          error: (err: any) => {
            console.log(err);
            if (err.error.status == 401 || err.error.status == 422) {
              this._toastrService.warning(err.error.message);
            } else {
              this._toastrService.error('Internal Server Error');
            }
  
          }
        })
      } else {
        this.form.markAllAsTouched();
        this._toastrService.warning('fill required fields');
      }
      
    }
    
}

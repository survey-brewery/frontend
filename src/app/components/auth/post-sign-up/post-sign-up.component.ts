import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { DataSharedService } from 'src/app/shared/data-shared.service'
import { SurveyService } from '../auth.service'
import { AdminService } from '../../admin/admin.service'
import { ToastrService } from 'ngx-toastr'
import { LowerCasePipe } from '@angular/common'

@Component({
  selector: 'app-post-sign-up',
  templateUrl: './post-sign-up.component.html',
  styleUrls: ['./post-sign-up.component.scss']
})
export class PostSignUpComponent implements OnInit {
  userForm!: FormGroup
  userData: any
  allProfessionList: Array<any> = []
  allSubProfessionList: Array<any> = []
  allRegionsList: Array<any> = []
  filteredRegionList: Array<any> = []
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
  searchRegionValue = ''
  profession = ''
  passwordVisible: boolean = false
  passwordConfirmVisible: boolean = false
  constructor (
    private fb: FormBuilder,
    private surveyService: SurveyService,
    private router: Router,
    private toastrService: ToastrService,
    private adminService: AdminService,
    private _dataSharedService: DataSharedService
  ) {}
  ngOnInit (): void {
    this.createUserForm()
    this.getAllProfessionList()
    this.getAllRegionsList()
    let userDataString: any = localStorage.getItem('userData')
    this.userData = JSON.parse(userDataString)
    this.control['email_id'].patchValue(this.userData.email_id)
    this.control['full_name'].patchValue(this.userData.full_name)
    this.control['user_name'].patchValue(this.userData.user_name)
    this.control['extenstions'].patchValue(this.userData.setPassword)
  }
  createUserForm () {
    this.userForm = this.fb.group({
      user_name: ['', Validators.required],
      full_name: ['', Validators.required],
      gender: [1],
      profession_id: [null, Validators.required],
      sub_profession_id: [null],
      region_id: [null, Validators.required],
      email_id: [null, Validators.required],
      extenstions: [null, Validators.required],
      password: []
    })
  }
  get control () {
    return this.userForm.controls
  }

  filterRegion () {
    if (this.searchRegionValue != '') {
      this.filteredRegionList = []
      const filteredArr = this.allRegionsList.filter(obj =>
        obj.region.toLowerCase().includes(this.searchRegionValue)
      )
      this.filteredRegionList = filteredArr
    } else {
      this.filteredRegionList = this.allRegionsList
    }
  }

  onSubmit () {
    console.log(this.userForm.value)
    if (this.userForm.valid) {
      this.surveyService.createUser(this.userForm.value).subscribe({
        next: (res: any) => {
          console.log(res)
          if (res.status == 201) {
            this.toastrService.success(res.message)
            localStorage.setItem('user_id', res.user_id)
            localStorage.setItem('accessToken', res.token)
            localStorage.setItem('expiresin', res.expiresin)
            this._dataSharedService.sendUserData(res.userData)
            localStorage.setItem('userData', JSON.stringify(res.userData))
            this.router.navigate([
              '/user',
              { outlets: { user_menu: ['dashboard'] } }
            ])
          } else {
            this.toastrService.warning(res.message)
          }
        },
        error: (err: any) => {
          console.log(err)
          if (err.error.status == 401 || err.error.status == 422) {
            this.toastrService.warning(err.error.message)
          } else {
            this.toastrService.error('Internal Server Error')
          }
        }
      })
    } else {
      console.log('form is invalid')
      this.userForm.markAllAsTouched()
      this.toastrService.warning('fill required fields')
    }
  }
  //get all  profession list for admin where adminid is 1 it is static...
  getAllProfessionList () {
    this.adminService.getAllProfessionsList('', '').subscribe({
      next: (res: any) => {
        console.log(res)
        if (res.data.length > 0) {
          this.allProfessionList = res.data
        }
      }
    })
  }
  //get all  regions list for admin where adminid is 1 it is static...
  getAllRegionsList () {
    this.adminService.getAllRegionsList('', '').subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allRegionsList = res.data
          this.filteredRegionList = this.allRegionsList
        }
      }
    })
  }
  getsubProfessionListByProfessionId () {
    let id = this.control['profession_id'].value
    this.control['sub_profession_id'].patchValue(0)
    this.profession = ''
    this.adminService.subProfessionListByProfessionId(id).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allSubProfessionList = res.data
          this.profession = new LowerCasePipe().transform(
            this.allSubProfessionList[0].profession
          )
        }
      }
    })
  }
  togglePasswordVisibility () {
    this.passwordVisible = !this.passwordVisible
  }
  togglePasswordConfirmVisibility () {
    this.passwordConfirmVisible = !this.passwordConfirmVisible
  }
}

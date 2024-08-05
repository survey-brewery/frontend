import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../admin.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LevelsComponent } from '../../levels/levels.component';

@Component({
  selector: 'app-add-update-sub-profession',
  templateUrl: './add-update-sub-profession.component.html',
  styleUrls: ['./add-update-sub-profession.component.scss']
})
export class AddUpdateSubProfessionComponent {
  form!: FormGroup;
  isEdit = false;
  user_id: any
  allProfessionList:Array<any>=[];
  constructor(
    private fb: FormBuilder,
    private _adminService: AdminService,
    private _toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<LevelsComponent>
  ) { }
  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id') as string;
    this.getAllProfession();
    this.createForm();
    if (this.data?.sub_profession_id != null) {
      this.isEdit = true;
      this.prepopulateData(this.data);
    }
  }
  createForm() {
    this.form = this.fb.group({
      sub_profession: [null, Validators.required],
      description: [null, Validators.maxLength(250)],
      profession_id:[null,Validators.required],
      user_id: [this.user_id, Validators.required],

    })
  }
  get control() {
    return this.form.controls;
  }
  getAllProfession(){
    this._adminService.getAllProfessionsList().subscribe((res:any)=>{
      this.allProfessionList=res.data;
    })
  }
  onSubmit() {
    this.isEdit ? this.updateProfession() : this.createProfession();
  }
  createProfession() {
    if (this.form.valid) {
      this._adminService.createSubProfession(this.form.value).subscribe({
        next: (res: any) => {
          if (res.status == 201) {
            this._toastrService.success(res.message);
            this.closeDialog('create');
          } else {
            this._toastrService.warning(res.message);
          }
        },
        error: (err: any) => {
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
  updateProfession() {
    if (this.form.valid) {
      this._adminService.updateSubProfession(this.form.value, this.data.sub_profession_id).subscribe({
        next: (res: any) => {
          if (res.status == 201) {
            this._toastrService.success(res.message);
            this.closeDialog('update');
          } else {
            this._toastrService.warning(res.message);
          }
        },
        error: (err: any) => {
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
  closeDialog(message?: any) {
    this.dialogRef.close(message)
  }
  prepopulateData(data: any) {
    this.control['profession_id'].patchValue(data.profession_id);
    this.control['sub_profession'].patchValue(data.sub_profession)
    this.control['description'].patchValue(data.description);
    this.control['user_id'].patchValue(data.user_id)
  }

}

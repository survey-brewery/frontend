import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../admin.service';
import { ToastrService } from 'ngx-toastr';
import { LevelsComponent } from '../../levels/levels.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-update-profession',
  templateUrl: './add-update-profession.component.html',
  styleUrls: ['./add-update-profession.component.scss']
})
export class AddUpdateProfessionComponent {
  form!: FormGroup;
  isEdit = false;
  user_id: any
  constructor(
    private fb: FormBuilder,
    private _adminService: AdminService,
    private _toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<LevelsComponent>
  ) { }
  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id') as string;
    this.createForm();
    if (this.data?.profession_id != null) {
      this.isEdit = true;
      this.prepopulateData(this.data);
    }
  }
  createForm() {
    this.form = this.fb.group({
      profession: [null, Validators.required],
      description: [null, Validators.maxLength(250)],
      user_id: [this.user_id, Validators.required],
    })
  }
  get control() {
    return this.form.controls;
  }
  onSubmit() {
    this.isEdit ? this.updateProfession() : this.createProfession();
  }
  createProfession() {
    if (this.form.valid) {
      this._adminService.createProfession(this.form.value).subscribe({
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
      this._adminService.updateProfession(this.form.value, this.data.profession_id).subscribe({
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
    this.control['profession'].patchValue(data.profession);
    this.control['description'].patchValue(data.description);
    this.control['user_id'].patchValue(data.user_id)
  }

}

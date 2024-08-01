import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LevelsComponent } from '../levels.component';
import { AdminService } from '../../../admin.service';

@Component({
  selector: 'app-add-update-level',
  templateUrl: './add-update-level.component.html',
  styleUrls: ['./add-update-level.component.scss']
})
export class AddUpdateLevelComponent implements OnInit {
  form!: FormGroup;
  isEdit=false;
  user_id:any
  constructor(
    private fb: FormBuilder, 
    private adminService: AdminService, 
    private toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<LevelsComponent>
  ) { }
  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id') as string;
    this.createForm();
    if (this.data?.level_id != null) {
      this.isEdit=true;
      this.prepopulateData(this.data);
    }
  }
  createForm() {
    this.form = this.fb.group({
      level: [null, [Validators.required,Validators.minLength(3)]],
      points_after_fill: [null, Validators.required],
      points_after_create: [null, Validators.required],
      limit_from: [null, Validators.required],
      limit_to: [null, Validators.required],
      user_id: [this.user_id, Validators.required],
      description:[null,Validators.maxLength(250)]
    })
  }
  get control() {
    return this.form.controls;
  }
onSubmit(){
  this.isEdit?this.updateLevel():this.createLevel();
}
createLevel() {
    if (this.form.valid) {
      this.adminService.createLevel(this.form.value).subscribe({
        next: (res: any) => {
          if (res.status == 201) {
            this.toastrService.success(res.message);
            this.closeDialog('create');
          } else {
            this.toastrService.warning(res.message);
          }
        },
        error: (err: any) => {
          if (err.error.status == 401 || err.error.status == 422) {
            this.toastrService.warning(err.error.message);
          } else {
            this.toastrService.error('Internal Server Error');
          }

        }
      })
    } else {
      this.form.markAllAsTouched();
      this.toastrService.warning('fill required fields');
    }
  }
  updateLevel(){
    if (this.form.valid) {
      this.adminService.updateLevel(this.form.value,this.data.level_id).subscribe({
        next: (res: any) => {
          if (res.status == 201) {
            this.toastrService.success(res.message);
            this.closeDialog('update');
          } else {
            this.toastrService.warning(res.message);
          }
        },
        error: (err: any) => {
          if (err.error.status == 401 || err.error.status == 422) {
            this.toastrService.warning(err.error.message);
          } else {
            this.toastrService.error('Internal Server Error');
          }
        }
      })
    } else {
      this.form.markAllAsTouched();
      this.toastrService.warning('fill required fields');
    }
  }
  
  closeDialog(message?:any) {
    this.dialogRef.close(message)
  }
  prepopulateData(data: any) {
    this.control['level'].patchValue(data.level);
    this.control['points_after_create'].patchValue(data.points_after_create);
    this.control['points_after_fill'].patchValue(data.points_after_fill);
    this.control['limit_from'].patchValue(data.limit_from);
    this.control['limit_to'].patchValue(data.limit_to);
    this.control['description'].patchValue(data.description);
    this.control['user_id'].patchValue(data.user_id)
  }
}

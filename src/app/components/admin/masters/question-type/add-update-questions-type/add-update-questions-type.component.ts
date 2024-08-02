import { Component, Inject } from '@angular/core';
import { AdminService } from '../../../admin.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LevelsComponent } from '../../levels/levels.component';

@Component({
  selector: 'app-add-update-questions-type',
  templateUrl: './add-update-questions-type.component.html',
  styleUrls: ['./add-update-questions-type.component.scss']
})
export class AddUpdateQuestionsTypeComponent {
  form!: FormGroup;
  isEdit = false;
  user_id: any
  inputTypeList=[
    {key:'text',label:'Textbox'},
    {key:'radio',label:'Radio'},
    {key:'checkbox',label:'Checkbox'},
  ]
  
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
    if (this.data?.question_type_id != null) {
      this.isEdit = true;
      this.prepopulateData(this.data);
    }
  }
  createForm() {
    this.form = this.fb.group({
      question_type: [null, Validators.required],
      input_type: [null, Validators.required],
      description:[null,Validators.maxLength(250)],
      user_id: [this.user_id, Validators.required],

    })
  }
  get control() {
    return this.form.controls;
  }
  onSubmit() {
    this.isEdit ? this.updateQuestionType() : this.createQuestionType();
  }
  createQuestionType() {
    if (this.form.valid) {
      this._adminService.createQuestionType(this.form.value).subscribe({
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
  updateQuestionType() {
    if (this.form.valid) {
      this._adminService.updateQuestionType(this.form.value, this.data.question_type_id).subscribe({
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
    this.control['question_type'].patchValue(data.question_type);
    this.control['description'].patchValue(data.description);  
    this.control['input_type'].patchValue(data.input_type); 
    this.control['user_id'].patchValue(data.user_id)
  }
}

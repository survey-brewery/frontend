import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-fill-survey-start',
  templateUrl: './user-fill-survey-start.component.html',
  styleUrls: ['./user-fill-survey-start.component.scss']
})
export class UserFillSurveyStartComponent implements OnInit {
  user_id: any
  selectedType!: string;
  selectedTabIndex: any = 1;
  optionTypeList: Array<any> = [];
  question_type = 'radio';
  currentQuestionIndex: number = 0;
  surveyDetails: any = {};
  previewQuestions: any = {};
  questionList: Array<any> = [];
  fillSurveyForm!: FormGroup;
  isSubmitted=false;
  constructor(
    private _toastrService: ToastrService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) { }
  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id') as string;
    this.route.params.subscribe((res: any) => {
      this.getSurveyById(res.id, this.user_id);
    });
    this.initForm();
  }

  initForm(): void {
    this.fillSurveyForm = this.fb.group({
      survey_id: [null, Validators.required],
      level_id: [null, Validators.required],
      user_id: [this.user_id],
      questions: this.fb.array([this.createQuestion()])
    });
  }

  get control() {
    return this.fillSurveyForm.controls;
  }

  get questions(): FormArray {
    return this.fillSurveyForm.get('questions') as FormArray;
  }

  createQuestion(): FormGroup {
    return this.fb.group({
      survey_question_id: [null, Validators.required],
      survey_question_no: [null, Validators.required],
      values: this.fb.array([this.createOption()]) // Create the initial form control for values
    });
  }

  createOption(): FormGroup {
    return this.fb.group({
      value: [null, Validators.required],
      survey_question_option_id: [null, Validators.required]
    });
  }

  onSubmit() {
    const formData = this.fillSurveyForm.value;
    let hasInvalidValues = false;
   
    // Check for null or empty string values in each question
    formData.questions.forEach((question: any) => {
      question.values.forEach((value: any) => {
        if (value.value === null || value.value.trim() === '') {
          hasInvalidValues = true;
          console.log('Invalid JSON: Null or empty value found in question', question.survey_question_id);
        }
      });
      
      if (question.values.length === 0) {
        hasInvalidValues = true;
        console.log('Invalid JSON: Empty values array in question', question.survey_question_id);
        
      }
    });
  
    if (hasInvalidValues) {
      this._toastrService.warning('Question is required.')
      console.log('Form is invalid: Null, empty, or empty values array found');
      // Handle invalid form data, such as displaying an error message or highlighting the invalid question
      // You can also use the stored currentQuestionIndex for further actions
    } else {
      // Form is valid, perform submission or further actions
      console.log(formData);
      this.userService.fillSurvey(formData).subscribe({
        next: (res: any) => {
          if (res.status == 201) {
            this._toastrService.success(res.message);
            // this.openModal();
            this.isSubmitted =true;
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
    }
  }
  
  
    
  


  getSurveyById(id: any, user_id: any) {
    this.userService.getSurveyById(id, user_id).subscribe({
      next: (res: any) => {
        console.log('survey Details ', res);
        this.surveyDetails = res.data[0];
        this.questionList = res.data[0].questions;
        this.questions.clear()
        this.control['survey_id'].setValue(this.surveyDetails.surveyId);
        this.control['level_id'].setValue(this.surveyDetails.level);
        for (let i = 0; i < this.questionList.length; i++) {
          this.questions.push(this.createQuestion())
          this.questions.at(i).get('survey_question_id')?.patchValue(this.questionList[i].questionId);
          this.questions.at(i).get('survey_question_no')?.patchValue(this.questionList[i].question_no);
        }
      }
    });
  }


  nextQuestion() {
    if (this.questionList.length > this.currentQuestionIndex + 1) {
      this.currentQuestionIndex++;
    } else {
      this.onSubmit();
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  selectOption(event: any, option: any, i: any, j: any, question: any) {
    console.log('question id', i);
    console.log('option', option.option);
    console.log('optionId', option.optionId);
    console.log('question', question.input_type);
    
    const valuesArray = this.questions.at(i).get('values') as FormArray;
    
    if (question.input_type === 'checkbox') {
      if (event.target.checked) {
        // Check if the option already exists in the values array
        const optionIndex = valuesArray.value.findIndex((value: any) => value.value === option.option);
        if (optionIndex === -1 && option.option !== null) {
          // Add the selected option to the values array
          valuesArray.push(this.createOptionFormGroup(option.option, option.optionId));
        }
      } else {
        // If the option is unchecked, remove it from the values array
        const optionIndex = valuesArray.value.findIndex((value: any) => value.value === option.option);
        if (optionIndex !== -1) {
          valuesArray.removeAt(optionIndex);
        }
      }
      
      // Remove the null value from the 0th index of the values array
      const nullOptionIndex = valuesArray.value.findIndex((value: any) => value.value === null);
      if (nullOptionIndex === 0) {
        valuesArray.removeAt(nullOptionIndex);
      }
    }
    
     else if (question.input_type === 'radio') {
      // Clear all other selected options in the radio button group
      valuesArray.clear();
      
      // Add the selected option to the values array
      valuesArray.push(this.createOptionFormGroup(option.option, option.optionId));
    }
  }
  
  
  createOptionFormGroup(option: string, optionId: string): FormGroup {
    return this.fb.group({
      value: [option, Validators.required],
      survey_question_option_id: [optionId, Validators.required]
    });
  }
  
  
  selectEnter(event: any, option: any, i: number, j: any) {
    const valuesArray = this.questions.at(i).get('values') as FormArray;
    valuesArray.at(i).get('value')?.patchValue(event.target.value);
    valuesArray.at(i).get('survey_question_option_id')?.patchValue(0);
  }
}

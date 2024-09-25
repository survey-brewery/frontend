import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { UserService } from 'src/app/components/user/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-admin-create-survey',
  templateUrl: './admin-create-survey.component.html',
  styleUrls: ['./admin-create-survey.component.scss']
})
export class AdminCreateSurveyComponent  implements OnInit {
  allRegionsList: Array<any> = [];
  allLevelsList: Array<any> = [];
  filteredRegionList: Array<any> = [];
  searchRegionValue = ''
  allProfessionsList: Array<any> = [];
  allSubProfessionsList: Array<any> = [];
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
  createSurveyForm!: FormGroup;
  profession = '';
  user_id: any;
  totalKarmaPoints = 0;
  selectedPerson: any;
  possibleResponseCount = 0;
  gender = 0;
  region_id = 0;
  profession_id = 0;
  sub_profession_id: any = 0;
  deductedPoint: any = 0
  //-----------
  questionForm!: FormGroup;
  optionTypeList: Array<any> = []
  question_type = 'radio';
  currentQuestionIndex: number = 0;
  questionList: Array<any> = [];
  selectedTabIndex: any = 0;
  constructor(
    private _adminService: AdminService,
    private fb: FormBuilder,
    private _userService: UserService,
    private router: Router,
    private _toastrService: ToastrService
  ) { }
  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id') as string;
    this.createForm();
    this.createQuestionForm();
    this.getDetails();
  }
  getDetails() {
    this.onLevelChange();
    this.getAllLevelsList();
    this.getAllProfessionsList();
    this.getAllRegionsList();
    this.getPossibleResponseCount();
    this.getQuestionTypeList();
    let value = new Date();
    const formattedDate = value.toISOString().split('T')[0];
    this.control['endDate'].patchValue(formattedDate);
    // this.getSurveyDetails();
  }
  createForm() {
    this.createSurveyForm = this.fb.group({
      title: ['', Validators.required],
      endDate: ['', Validators.required],
      level: ['', Validators.required],
      level_id: [null, Validators.required],
      gender: [0, Validators.required],
      region: [0, Validators.required],
      profession: [0, Validators.required],
      sub_profession: ["0"],
      user_id: [this.user_id, Validators.required],
      possibleResponseCount: [this.possibleResponseCount]
    });

  }
  createQuestionForm() {
    this.questionForm = this.fb.group({
      questions: this.fb.array([this.createQuestion()])
    });
  }
  createQuestion(): FormGroup {
    return this.fb.group({
      question: ['', Validators.required],
      input_type: [{ question_type_id: '1', input_type: 'radio' }],
      question_no: [],
      options: this.fb.array([this.createOption()])
    });
  }
  get questions(): FormArray {
    return this.questionForm.get('questions') as FormArray;
  }
  get control() {
    return this.createSurveyForm.controls;
  }
  getOptions(question: AbstractControl): FormArray {
    return question.get('options') as FormArray;
  }
  createOption(): FormGroup {
    return this.fb.group({
      option: ['', Validators.required]
    });
  }
  addQuestion() {
    localStorage.setItem('questions', JSON.stringify(this.control['questions']?.value))
    if (this.questionForm.valid) {
      if (this.questions.value.length == this.currentQuestionIndex + 1) {
        this.questions.push(this.createQuestion());
      }
    }else{
      this.questionForm.markAllAsTouched()
      this._toastrService.warning("Fill required fields")
    }
    this.currentQuestionIndex++;
  }
  addQuestionInvalid(index:any){
    this.questions.at(index).markAllAsTouched()
    this._toastrService.warning("Fill required fields")
  }
  addOption(question: AbstractControl) {
    const options = this.getOptions(question);
    options.push(this.createOption());
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  removeQuestion(index: number) {
    const questions = this.questionForm.get('questions') as FormArray;
    const questionList = this.questionList;
    if (index >= 0 && index < questions.length) {
      questions.removeAt(index);

      if (index < questionList.length) {
        questionList.splice(index, 1);
      }
    }
    const surveyQuestion = this.questionForm.value.questions;
    const surveyQuestionFilter = surveyQuestion.filter((res: any) => res.question !== '');
    localStorage.setItem('questions', JSON.stringify(surveyQuestionFilter));
    this.previousQuestion();
  }

  removeOption(question: AbstractControl, optionIndex: number) {
    const options = this.getOptions(question);
    options.removeAt(optionIndex);

  }

  addQuestionWithOption() {
    const questions = this.questionForm.get('questions') as FormArray;
    const questionFormGroup = this.createQuestion();
    questions.push(questionFormGroup);
    // Add one option to the newly added question
    this.addOption(questionFormGroup);
  }
  getAllRegionsList() {
    this._adminService.getAllRegionsList('', '').subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allRegionsList = res.data;
          this.filteredRegionList = this.allRegionsList;
        }
      },
      error: (err: any) => {
        console.log(err);
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
      this.filteredRegionList = this.allRegionsList;
    }
  }
  getAllLevelsList() {
    this._adminService.getAllLevelsList(this.user_id).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allLevelsList = res.data;
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
  getAllProfessionsList() {
    this._adminService.getAllProfessionsList('', '').subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allProfessionsList = res.data;
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
  getSubProfessionListById() {
    let profession_id = this.control['profession'].value;
    this.sub_profession_id = "0";
    this.control['sub_profession'].patchValue(this.sub_profession_id);
    this.profession_id = profession_id;
    this.getPossibleResponseCount();
    this.profession = '';
    this._adminService.subProfessionListByProfessionId(profession_id).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allSubProfessionsList = res.data;
          this.profession = new LowerCasePipe().transform(this.allSubProfessionsList[0].profession)
          if (this.profession === 'student') {
            this.control['sub_profession'].setValidators(Validators.required);
          } else {
            this.control['sub_profession'].removeValidators(Validators.required);
          }
          this.control['sub_profession'].updateValueAndValidity();
        } else {
          this.allSubProfessionsList = [];
        }
      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }
  onLevelChange() {
    let level: any = this.control['level_id'].value;
    this.control['level'].patchValue(level?.level_id);
    this.deductedPoint = level?.points_after_create
    // this._userService.getTotalKarmaPoints(this.user_id).subscribe({
    //   next: (res: any) => {
    //     if (res.status == 201) {
    //       this.totalKarmaPoints = res.total;
    //       if (Number(level?.points_after_create) > res.total) {
    //         this.control['level_id'].patchValue(null);
    //       }
    //     }
    //   }
    // })



  }
  convertString(value: any) {
    return parseInt(value)
  }
  getPossibleResponseCount() {
    this._adminService.getPossibleResponseCount(this.gender, this.region_id, this.profession_id, this.sub_profession_id).subscribe({
      next: (res: any) => {
        this.possibleResponseCount = res.data.possibleResCount;
        this.control['possibleResponseCount'].patchValue(this.possibleResponseCount);
      }
    })
  }
  onGenderChange(event: any) {
    this.gender = event.value;
    this.getPossibleResponseCount();
  }
  onRegionChange(event: any) {
    this.region_id = event.value;
    this.getPossibleResponseCount();
  }

  onSubProfessionChange(event: any) {
    this.sub_profession_id = event.value;
    this.getPossibleResponseCount();
  }
  changeTab(tab_name: any) {
    for (let i = 0; i < document.querySelectorAll('.mdc-tab__text-label').length; i++) {
      if ((<HTMLElement>document.querySelectorAll('.mdc-tab__text-label')[i]).innerText == tab_name) {
        (<HTMLElement>document.querySelectorAll('.mdc-tab__text-label')[i]).click()
      }
    }
  }
  getSurveyDetails() {
    let data: any = localStorage.getItem('data');
    let surveyDetails: any = JSON.parse(data)
    if (surveyDetails?.title != '') {
      this.control['title'].patchValue(surveyDetails.title);
      this.control['endDate'].patchValue(surveyDetails.endDate);
      this.control['level'].patchValue(surveyDetails.level);
      this.control['level_id'].patchValue(surveyDetails.level_id);
      this.control['gender'].patchValue(surveyDetails.gender);
      this.control['region'].patchValue(surveyDetails.region);
      this.control['profession'].patchValue(surveyDetails.profession);
      this.getSubProfessionListById()
      this.control['sub_profession'].patchValue(surveyDetails.sub_profession);
      this.control['user_id'].patchValue(surveyDetails.user_id);
      this.control['possibleResponseCount'].patchValue(surveyDetails.possibleResponseCount);
    } else {
      console.log('No data found in local storage.');
    }
  }
  //---------------------------------------------
  onTabSelect(event: any) {
    this.selectedTabIndex = event;
    if (event == 2 || event == 1) {
      if (this.control['title'].value != '') {
        localStorage.setItem("data", JSON.stringify(this.createSurveyForm.value));
      }
    } else if (event == 3) {
      localStorage.setItem('questions', JSON.stringify(this.questionForm.value));
    }
    this.clickPreviewTab()
  }
  getQuestionTypeList() {
    this._adminService.getAllQuestionsTypeList('', '').subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.optionTypeList = res.data;
        }
      }
    })
  }
  onchangeOptionType(event: any, i: any) {
    console.log(event, i);

    const optionControl = this.questionForm.get(`questions.${i}.input_type`)?.value.input_type;
    this.question_type = optionControl
    if (optionControl == 'text') {
      this.questionForm.get(`questions.${i}`)?.get(`options.${0}`)?.get('option')?.clearValidators();
    } else {
      this.questionForm.get(`questions.${i}`)?.get(`options.${0}`)?.get('option')?.addValidators(Validators.required);
    }
    this.questionForm.get(`questions.${i}`)?.get(`options.${0}`)?.get('option')?.updateValueAndValidity();

  }
  clickPreviewTab() {
    let localData: any = localStorage.getItem('questions');
    let parsedData: any = JSON.parse(localData);
    const questionList = parsedData.questions.reduce((filteredQuestions: any, question: any, index: number) => {
      if (question.options) {
        const filteredOptions = question.options.filter((option: any) => {
          if (question.input_type.input_type === 'text') {
            return true; // Keep all options if input_type is 'text'
          }
          return option.option.trim() !== '';
        });

        if (filteredOptions.length > 0) {
          const questionWithNo = {
            ...question,
            options: filteredOptions,
            question_no: index + 1 // Add question_no property with index + 1
          };
          filteredQuestions.push(questionWithNo);
        }
      }
      return filteredQuestions;
    }, []);
    this.questionList = questionList;

  }
  endSurvey() {
    this.clickPreviewTab();
    if (this.questionList.length != 0) {
      let data = localStorage.getItem('data');
      let parsedData = data ? JSON.parse(data) : {};
      parsedData.questions = this.questionList;
      this._userService.createSurvey(parsedData).subscribe({
        next: (res: any) => {
          if (res.status == 201) {
            this._toastrService.success(res.message);
            // [routerLink]="['/admin', { outlets: { sub_menu: ['admin']}}]"
            this.router.navigate(['/admin', { outlets: { sub_menu: ['admin']}}])
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
      });

    } else {
      this._toastrService.warning("Fill required fields");
      this.createSurveyForm.markAllAsTouched();
      this.questionForm.markAllAsTouched();
      this.changeTab('Basic Info')
    }

  }
}


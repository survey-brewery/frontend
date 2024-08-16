import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFillSurveyListComponent } from './user-fill-survey-list.component';

describe('UserFillSurveyListComponent', () => {
  let component: UserFillSurveyListComponent;
  let fixture: ComponentFixture<UserFillSurveyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFillSurveyListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFillSurveyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

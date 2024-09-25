import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSurveyAnalyticComponent } from './user-survey-analytic.component';

describe('UserSurveyAnalyticComponent', () => {
  let component: UserSurveyAnalyticComponent;
  let fixture: ComponentFixture<UserSurveyAnalyticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSurveyAnalyticComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSurveyAnalyticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

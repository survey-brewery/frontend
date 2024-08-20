import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFillSurveyComponent } from './user-fill-survey.component';

describe('UserFillSurveyComponent', () => {
  let component: UserFillSurveyComponent;
  let fixture: ComponentFixture<UserFillSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFillSurveyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFillSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

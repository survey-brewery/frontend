import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFillSurveyStartComponent } from './user-fill-survey-start.component';

describe('UserFillSurveyStartComponent', () => {
  let component: UserFillSurveyStartComponent;
  let fixture: ComponentFixture<UserFillSurveyStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFillSurveyStartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFillSurveyStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

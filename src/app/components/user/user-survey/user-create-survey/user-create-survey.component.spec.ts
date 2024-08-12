import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreateSurveyComponent } from './user-create-survey.component';

describe('UserCreateSurveyComponent', () => {
  let component: UserCreateSurveyComponent;
  let fixture: ComponentFixture<UserCreateSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCreateSurveyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCreateSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

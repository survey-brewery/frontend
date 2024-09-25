import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateSurveyComponent } from './admin-create-survey.component';

describe('AdminCreateSurveyComponent', () => {
  let component: AdminCreateSurveyComponent;
  let fixture: ComponentFixture<AdminCreateSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCreateSurveyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCreateSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateSurveyListComponent } from './admin-create-survey-list.component';

describe('AdminCreateSurveyListComponent', () => {
  let component: AdminCreateSurveyListComponent;
  let fixture: ComponentFixture<AdminCreateSurveyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCreateSurveyListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCreateSurveyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

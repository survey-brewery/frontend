import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSurveyorAnswerComponent } from './view-surveyor-answer.component';

describe('ViewSurveyorAnswerComponent', () => {
  let component: ViewSurveyorAnswerComponent;
  let fixture: ComponentFixture<ViewSurveyorAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSurveyorAnswerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSurveyorAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateQuestionsTypeComponent } from './add-update-questions-type.component';

describe('AddUpdateQuestionsTypeComponent', () => {
  let component: AddUpdateQuestionsTypeComponent;
  let fixture: ComponentFixture<AddUpdateQuestionsTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateQuestionsTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateQuestionsTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

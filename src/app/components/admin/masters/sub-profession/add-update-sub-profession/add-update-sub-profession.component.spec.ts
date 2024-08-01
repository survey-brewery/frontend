import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateSubProfessionComponent } from './add-update-sub-profession.component';

describe('AddUpdateSubProfessionComponent', () => {
  let component: AddUpdateSubProfessionComponent;
  let fixture: ComponentFixture<AddUpdateSubProfessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateSubProfessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateSubProfessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

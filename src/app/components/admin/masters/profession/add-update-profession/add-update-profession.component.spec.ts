import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateProfessionComponent } from './add-update-profession.component';

describe('AddUpdateProfessionComponent', () => {
  let component: AddUpdateProfessionComponent;
  let fixture: ComponentFixture<AddUpdateProfessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateProfessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateProfessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

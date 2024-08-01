import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateLevelComponent } from './add-update-level.component';

describe('AddUpdateLevelComponent', () => {
  let component: AddUpdateLevelComponent;
  let fixture: ComponentFixture<AddUpdateLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateLevelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateRegionsComponent } from './add-update-regions.component';

describe('AddUpdateRegionsComponent', () => {
  let component: AddUpdateRegionsComponent;
  let fixture: ComponentFixture<AddUpdateRegionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateRegionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateRegionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

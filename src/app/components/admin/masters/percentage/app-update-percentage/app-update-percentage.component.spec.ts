import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUpdatePercentageComponent } from './app-update-percentage.component';

describe('AppUpdatePercentageComponent', () => {
  let component: AppUpdatePercentageComponent;
  let fixture: ComponentFixture<AppUpdatePercentageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppUpdatePercentageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppUpdatePercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

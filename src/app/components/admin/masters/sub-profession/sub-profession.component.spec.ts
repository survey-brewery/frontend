import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubProfessionComponent } from './sub-profession.component';

describe('SubProfessionComponent', () => {
  let component: SubProfessionComponent;
  let fixture: ComponentFixture<SubProfessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubProfessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubProfessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

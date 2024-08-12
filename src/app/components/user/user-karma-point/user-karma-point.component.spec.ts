import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserKarmaPointComponent } from './user-karma-point.component';

describe('UserKarmaPointComponent', () => {
  let component: UserKarmaPointComponent;
  let fixture: ComponentFixture<UserKarmaPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserKarmaPointComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserKarmaPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

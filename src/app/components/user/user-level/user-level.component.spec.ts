import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLevelComponent } from './user-level.component';

describe('UserLevelComponent', () => {
  let component: UserLevelComponent;
  let fixture: ComponentFixture<UserLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLevelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

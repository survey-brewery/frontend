import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreateSurveryListComponent } from './user-create-survery-list.component';

describe('UserCreateSurveryListComponent', () => {
  let component: UserCreateSurveryListComponent;
  let fixture: ComponentFixture<UserCreateSurveryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCreateSurveryListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCreateSurveryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

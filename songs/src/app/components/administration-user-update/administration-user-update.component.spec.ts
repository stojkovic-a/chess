import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationUserUpdateComponent } from './administration-user-update.component';

describe('AdministrationPlayerUpdateComponent', () => {
  let component: AdministrationUserUpdateComponent;
  let fixture: ComponentFixture<AdministrationUserUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrationUserUpdateComponent]
    });
    fixture = TestBed.createComponent(AdministrationUserUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

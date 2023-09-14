import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationUserDeleteComponent } from './administration-user-delete.component';

describe('AdministrationUserDeleteComponent', () => {
  let component: AdministrationUserDeleteComponent;
  let fixture: ComponentFixture<AdministrationUserDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrationUserDeleteComponent]
    });
    fixture = TestBed.createComponent(AdministrationUserDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

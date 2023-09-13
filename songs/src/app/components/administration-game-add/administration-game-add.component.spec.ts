import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationGameAddComponent } from './administration-game-add.component';

describe('AdministrationGameAddComponent', () => {
  let component: AdministrationGameAddComponent;
  let fixture: ComponentFixture<AdministrationGameAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrationGameAddComponent]
    });
    fixture = TestBed.createComponent(AdministrationGameAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

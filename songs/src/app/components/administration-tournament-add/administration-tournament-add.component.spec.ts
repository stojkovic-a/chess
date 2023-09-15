import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationTournamentAddComponent } from './administration-tournament-add.component';

describe('AdministrationTournamentAddComponent', () => {
  let component: AdministrationTournamentAddComponent;
  let fixture: ComponentFixture<AdministrationTournamentAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrationTournamentAddComponent]
    });
    fixture = TestBed.createComponent(AdministrationTournamentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

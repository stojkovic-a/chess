import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationTournamentParticipationTableComponent } from './administration-tournament-participation-table.component';

describe('AdministrationTournamentParticipationTableComponent', () => {
  let component: AdministrationTournamentParticipationTableComponent;
  let fixture: ComponentFixture<AdministrationTournamentParticipationTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrationTournamentParticipationTableComponent]
    });
    fixture = TestBed.createComponent(AdministrationTournamentParticipationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

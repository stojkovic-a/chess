import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationTournamentGameTableComponent } from './administration-tournament-game-table.component';

describe('AdministrationTournamentGameTableComponent', () => {
  let component: AdministrationTournamentGameTableComponent;
  let fixture: ComponentFixture<AdministrationTournamentGameTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrationTournamentGameTableComponent]
    });
    fixture = TestBed.createComponent(AdministrationTournamentGameTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

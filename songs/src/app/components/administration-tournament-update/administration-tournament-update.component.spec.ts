import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationTournamentUpdateComponent } from './administration-tournament-update.component';

describe('AdministrationTournamentUpdateComponent', () => {
  let component: AdministrationTournamentUpdateComponent;
  let fixture: ComponentFixture<AdministrationTournamentUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrationTournamentUpdateComponent]
    });
    fixture = TestBed.createComponent(AdministrationTournamentUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationTournamentDeleteComponent } from './administration-tournament-delete.component';

describe('AdministrationTournamentDeleteComponent', () => {
  let component: AdministrationTournamentDeleteComponent;
  let fixture: ComponentFixture<AdministrationTournamentDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrationTournamentDeleteComponent]
    });
    fixture = TestBed.createComponent(AdministrationTournamentDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

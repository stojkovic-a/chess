import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessGamesFiltersComponent } from './chess-games-filters.component';

describe('ChessGamesFiltersComponent', () => {
  let component: ChessGamesFiltersComponent;
  let fixture: ComponentFixture<ChessGamesFiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChessGamesFiltersComponent]
    });
    fixture = TestBed.createComponent(ChessGamesFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

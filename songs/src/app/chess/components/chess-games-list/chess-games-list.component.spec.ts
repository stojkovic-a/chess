import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessGamesListComponent } from './chess-games-list.component';

describe('ChessGamesListComponent', () => {
  let component: ChessGamesListComponent;
  let fixture: ComponentFixture<ChessGamesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChessGamesListComponent]
    });
    fixture = TestBed.createComponent(ChessGamesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

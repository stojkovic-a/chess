import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessGameViewComponent } from './chess-game-view.component';

describe('ChessGameViewComponent', () => {
  let component: ChessGameViewComponent;
  let fixture: ComponentFixture<ChessGameViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChessGameViewComponent]
    });
    fixture = TestBed.createComponent(ChessGameViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

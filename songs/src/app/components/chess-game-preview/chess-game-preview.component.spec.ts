import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessGamePreviewComponent } from './chess-game-preview.component';

describe('ChessGamePreviewComponent', () => {
  let component: ChessGamePreviewComponent;
  let fixture: ComponentFixture<ChessGamePreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChessGamePreviewComponent]
    });
    fixture = TestBed.createComponent(ChessGamePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

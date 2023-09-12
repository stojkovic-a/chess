import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesWithPositionComponent } from './games-with-position.component';

describe('GamesWithPositionComponent', () => {
  let component: GamesWithPositionComponent;
  let fixture: ComponentFixture<GamesWithPositionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GamesWithPositionComponent]
    });
    fixture = TestBed.createComponent(GamesWithPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

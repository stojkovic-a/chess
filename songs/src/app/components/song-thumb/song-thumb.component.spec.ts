import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongThumbComponent } from './song-thumb.component';

describe('SongThumbComponent', () => {
  let component: SongThumbComponent;
  let fixture: ComponentFixture<SongThumbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SongThumbComponent]
    });
    fixture = TestBed.createComponent(SongThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

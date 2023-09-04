import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongEditorComponent } from './song-editor.component';

describe('SongEditorComponent', () => {
  let component: SongEditorComponent;
  let fixture: ComponentFixture<SongEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SongEditorComponent]
    });
    fixture = TestBed.createComponent(SongEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {StoreDevtoolsModule} from '@ngrx/store-devtools'

import { AppComponent } from './app.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import {HttpClientModule} from '@angular/common/http';
import { SongThumbComponent } from './components/song-thumb/song-thumb.component';
import { SongEditorComponent } from './components/song-editor/song-editor.component';
import { StoreModule } from '@ngrx/store';
import { songReducer } from './store/song.reducer';
import { AppState } from './app.state';
import { SongsEffects } from './store/song.effects';
import {EffectsModule} from '@ngrx/effects'

@NgModule({
  declarations: [
    AppComponent,
    PlaylistComponent,
    SongThumbComponent,
    SongEditorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot<AppState>({songs:songReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    EffectsModule.forRoot([SongsEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

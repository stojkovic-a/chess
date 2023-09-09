import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {StoreDevtoolsModule} from '@ngrx/store-devtools'

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { SongThumbComponent } from './components/song-thumb/song-thumb.component';
import { StoreModule } from '@ngrx/store';
import { AppState } from './app.state';
import {EffectsModule} from '@ngrx/effects';
import { ChessGamesListComponent } from './chess/components/chess-games-list/chess-games-list.component';
import { ChessGamePreviewComponent } from './chess/components/chess-game-preview/chess-game-preview.component';
import { PlayerInfoComponent } from './chess/components/player-info/player-info.component'
import { gameReducer, pageReducer, playerReducer } from './chess/store/chess.reducer';
import { ChessEffects } from './chess/store/chess.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SongThumbComponent,
    ChessGamesListComponent,
    ChessGamePreviewComponent,
    PlayerInfoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot<AppState>({pages:pageReducer,players:playerReducer,games:gameReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    EffectsModule.forRoot([ChessEffects]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

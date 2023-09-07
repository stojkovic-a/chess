import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { AppComponent } from './app.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SongThumbComponent } from './components/song-thumb/song-thumb.component';
import { SongEditorComponent } from './components/song-editor/song-editor.component';
import { StoreModule } from '@ngrx/store';
import { songReducer } from './store/song.reducer';
import { AppState } from './app.state';
import { SongsEffects } from './store/song.effects';
import { EffectsModule } from '@ngrx/effects'
// import { authReducer } from './store/auth/auth.reducer';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { AuthEffects } from './store/auth/auth.effects';
import { reducer } from './store/auth/auth.reducer';
import { AuthInterceptor } from './auth.interceptor';
import { AuthGuard } from './services/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    PlaylistComponent,
    SongThumbComponent,
    SongEditorComponent,
    SignUpComponent,
    LogInComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({ auth: reducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    EffectsModule.forRoot([SongsEffects]),
    EffectsModule.forRoot([AuthEffects]),
    RouterModule.forRoot([
      { path: 'log-in', component: LogInComponent },
      { path: 'sign-up', component: SignUpComponent },
      //TODO: Protected page example, use where needed
      // { path: 'sign-up', component: SignUpComponent, canActivate: [AuthGuard] },
      { path: '', component: LandingComponent },
      { path: '**', redirectTo: '/' }
    ])
  ],
  providers: [AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

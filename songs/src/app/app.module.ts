import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { AppComponent } from './app.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SongThumbComponent } from './components/song-thumb/song-thumb.component';
import { StoreModule } from '@ngrx/store';
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
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    SongThumbComponent,
    ChessGamesListComponent,
    ChessGamePreviewComponent,
    PlayerInfoComponent
    SongEditorComponent,
    SignUpComponent,
    LogInComponent,
    LandingComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot<AppState>({pages:pageReducer,players:playerReducer,games:gameReducer,auth:reducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    EffectsModule.forRoot([ChessEffects]),
    EffectsModule.forRoot([SongsEffects]),
    EffectsModule.forRoot([AuthEffects]),
    RouterModule.forRoot([
      { path: 'log-in', component: LogInComponent },
      { path: 'sign-up', component: SignUpComponent },
      //TODO: Protected page example, use where needed
      // { path: 'sign-up', component: SignUpComponent, canActivate: [AuthGuard] },
      { path: '', component: LandingComponent },
      { path: '**', redirectTo: '/' }
    ]),
    BrowserAnimationsModule
  ],
  providers: [AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

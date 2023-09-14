import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { AppState } from './app.state';
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
import { ChessGamePreviewComponent } from './components/chess-game-preview/chess-game-preview.component';
import { ChessGamesListComponent } from './components/chess-games-list/chess-games-list.component';
import { PlayerInfoComponent } from './components/player-info/player-info.component';
import { ChessEffects } from './store/chess.effects';
import { pageReducer, playerReducer, gameReducer, filterReducer, userReducer } from './store/chess.reducer';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ChessGamesFiltersComponent } from './components/chess-games-filters/chess-games-filters.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ChessGameComponent } from './components/chess-game/chess-game.component';
import { ChessGameViewComponent } from './components/chess-game-view/chess-game-view.component';
import { MatIconModule } from '@angular/material/icon';
import { GamesWithPositionComponent } from './components/games-with-position/games-with-position.component';
import { AdministrationPageComponent } from './components/administration-page/administration-page.component';
import { AdministrationGameAddComponent } from './components/administration-game-add/administration-game-add.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AdministrationUserDeleteComponent } from './components/administration-user-delete/administration-user-delete.component';
import { UserTableComponent } from './components/user-table/user-table.component';

@NgModule({
  declarations: [
    AppComponent,
    ChessGamesListComponent,
    ChessGamePreviewComponent,
    PlayerInfoComponent,
    SignUpComponent,
    LogInComponent,
    LandingComponent,
    NavbarComponent,
    ChessGamesFiltersComponent,
    ChessGameComponent,
    ChessGameViewComponent,
    GamesWithPositionComponent,
    AdministrationPageComponent,
    AdministrationGameAddComponent,
    AdministrationUserDeleteComponent,
    UserTableComponent,
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSortModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    // HttpClientXsrfModule.withOptions({ cookieName: 'accessToken', headerName: 'Authorization', }),
    StoreModule.forRoot<AppState>({
      pages: pageReducer,
      players: playerReducer,
      games: gameReducer,
      auth: reducer,
      filters: filterReducer,
      users: userReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    EffectsModule.forRoot([ChessEffects, AuthEffects]),
    RouterModule.forRoot([
      { path: 'log-in', component: LogInComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'about', component: ChessGamesListComponent },
      { path: 'contact', component: AdministrationPageComponent },
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

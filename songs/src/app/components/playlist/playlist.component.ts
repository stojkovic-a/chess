// import { Component, OnInit } from '@angular/core';
// import { Observable, from, of } from 'rxjs';
// import { Song } from 'src/app/chess/models/song';
// import { SongsService } from 'src/app/chess/services/songs.service';
// import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
// import { SongsState } from 'src/app/chess/store/chess.reducer';
// import { Store } from '@ngrx/store';
// import { loadSongs, selectSong } from 'src/app/chess/store/chess.action';
// import { AppState } from 'src/app/app.state';
// import { selectSongsList } from 'src/app/chess/store/chess.selector';

// @Component({
//   selector: 'app-playlist',
//   templateUrl: './playlist.component.html',
//   styleUrls: ['./playlist.component.scss']
// })
// export class PlaylistComponent implements OnInit {
//   song$: Observable<Song[]> = of([]);
//   title: string = 'Mnogo dobre pesme';
//   constructor(
//     private store: Store<AppState>) {

//   }
//   ngOnInit(): void {
//     this.store.dispatch(loadSongs());
//     this.song$ = this.store.select(selectSongsList);
//   }

//   selectSong(song: Song) {
//     this.store.dispatch(
//       selectSong({
//         songId: song.id,
//       }));
//   }
// }

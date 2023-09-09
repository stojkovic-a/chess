// import { Component, Input, OnInit } from '@angular/core';
// import { Song, SongRating } from 'src/app/chess/models/song';
// import { SafeUrl, DomSanitizer } from "@angular/platform-browser"
// import { Store } from '@ngrx/store';
// import { AppState } from 'src/app/app.state';
// import { raceWith } from 'rxjs';

// @Component({
//   selector: 'app-song-editor',
//   templateUrl: './song-editor.component.html',
//   styleUrls: ['./song-editor.component.scss']
// })
// export class SongEditorComponent implements OnInit {
//   videoUrl: SafeUrl = {};

//   // @Input() song:Song|null=null;
//   private _song: Song | null = null;
//   @Input()
//   set song(value) {
//     this._song = value;
//     if (value?.link) {
//       this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
//         "https://www.youtube.com/embed/" + value?.link);
//     }
//   }

//   get song() {
//     return this._song;
//   }

//   constructor(private sanitizer: DomSanitizer, private store: Store<AppState>) {
//     this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/");
//     this.song =
//     {
//       "id": 1,
//       "title": "Shape of you",
//       "artist": "Edd Sheran",
//       "viewsCount": 6.7,
//       "link": "JGwWNGJdvx8",
//       "rating": SongRating.None
//     }
//   }
//   ngOnInit(): void {
//     this.store.select(selectSelectedSong).subscribe(song => {
//       if (song) {
//         this.song = song;
//       }
//     })
//   }
//   selectSong(song: Song) {
//     console.log("selektovana pesma je ", song);
//     this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + song.link);
//   }

//   like() {
//     if (this.song) {
//       this.store.dispatch(rateSong({ songId: this.song.id, rating: SongRating.Like }))
//     }
//   }
//   dislike() {
//     if (this.song) {
//       this.store.dispatch(rateSong({ songId: this.song.id, rating: SongRating.Dislike }))
//     }
//   }

//   rating(): string {
//     if (this.song) {
//       switch (this.song.rating) {
//         case SongRating.Like: return '+'; break;
//         case SongRating.Dislike: return '-'; break;
//         default: return '';
//       }
//     } else {
//       return "";
//     }
//   }
// }

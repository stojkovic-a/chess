import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chess-game',
  templateUrl: './chess-game.component.html',
  styleUrls: ['./chess-game.component.scss']
})
export class ChessGameComponent implements OnInit {
  id: string;
  constructor(
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('gameId');
    console.log(this.id, 'id iz parent-a');
  }


}

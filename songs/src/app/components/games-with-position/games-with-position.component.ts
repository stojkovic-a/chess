import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-games-with-position',
  templateUrl: './games-with-position.component.html',
  styleUrls: ['./games-with-position.component.scss']
})
export class GamesWithPositionComponent implements OnInit{
  @Input() currentFen: string;
  constructor(){

  }

  ngOnInit(): void {
      console.log(this.currentFen);
  }

}

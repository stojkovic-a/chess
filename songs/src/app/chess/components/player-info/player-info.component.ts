import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Player } from '../../models';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss']
})
export class PlayerInfoComponent implements OnInit{
  @Input() player:Player|null=null;

  ngOnInit(): void {
      
  }
}

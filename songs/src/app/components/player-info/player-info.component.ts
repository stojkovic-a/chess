import { Component, HostListener, Input, OnInit, Inject } from '@angular/core';
import { Player } from '../../models';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { selectPlayerInfo } from 'src/app/store/chess.selector';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DateService } from 'src/app/services/date.service/date.service';
@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss'],
})
export class PlayerInfoComponent implements OnInit {
  constructor(
    public dateService:DateService,
    public dialogRef: MatDialogRef<PlayerInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public player: Player,
  ) {

  }
  ngOnInit(): void {

  }

  closeDialog() {
    this.dialogRef.close();
  }
}

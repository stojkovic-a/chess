import { Component, OnInit, Inject } from '@angular/core';
import { Player } from '../../models';
import { Observable, map } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DateService } from 'src/app/services/date.service/date.service';
import { selectRoles } from 'src/app/store/auth/auth.selector';
import { Role } from 'src/app/enums';
@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss'],
})
export class PlayerInfoComponent implements OnInit {
  userIsAdmin$: Observable<boolean>;

  constructor(
    public dateService: DateService,
    public dialogRef: MatDialogRef<PlayerInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public player: Player,
    private store: Store<AppState>,
  ) {

  }
  ngOnInit(): void {
    this.userIsAdmin$ = this.store.select(selectRoles)
      .pipe(
        map(roles => {
          return roles.includes(Role.Admin);
        })
      )
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

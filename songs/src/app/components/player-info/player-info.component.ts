import { Component, HostListener, Input, OnInit, Inject } from '@angular/core';
import { Player } from '../../models';
import { Observable, map, of } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { selectPlayerInfo } from 'src/app/store/user/user.selector';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
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

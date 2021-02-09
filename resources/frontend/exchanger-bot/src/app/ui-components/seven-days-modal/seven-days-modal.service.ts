import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Observable } from 'rxjs'

import { SevenDaysModalComponent } from './seven-days-modal.component'

@Injectable()
export class SevenDaysModalService {

  constructor(public dialog: MatDialog) {}

  openDialog(): Observable<boolean> {
    const dialogRef = this.dialog.open(SevenDaysModalComponent, {
      panelClass: 'seven-day-popup'
    })

    return dialogRef.afterClosed()
  }

}

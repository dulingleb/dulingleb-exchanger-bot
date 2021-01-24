import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Observable } from 'rxjs'

import { ConfirmModalComponent } from './confirm-modal.component'
import { IConfirmModal } from './confirm-modal.model'

@Injectable()
export class ConfirmModalService {

  constructor(public dialog: MatDialog) {}

  openDialog(data: IConfirmModal): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmModalComponent, { data })

    return dialogRef.afterClosed()
  }

}

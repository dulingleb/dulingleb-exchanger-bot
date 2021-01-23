import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

import { ConfirmModalComponent } from './confirm-modal.component'
import { IConfirmModal } from './confirm-modal.model'

@Injectable()
export class ConfirmModalService {

  constructor(public dialog: MatDialog) {}

  openDialog(data: IConfirmModal): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, { data })

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`)
    })
  }

}

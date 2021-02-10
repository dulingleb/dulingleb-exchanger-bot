import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Observable } from 'rxjs'

import { ImageModalComponent } from './image-modal.component'

@Injectable()
export class ImageModalService {

  constructor(public dialog: MatDialog) {}

  openDialog(data: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ImageModalComponent, { data })

    return dialogRef.afterClosed()
  }

}

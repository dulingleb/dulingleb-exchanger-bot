import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'

import { SnackBarComponent } from './snack-bar.component'
import { SNACK_BAR_DEFAULT } from './snack-bar.constant'
import { ISnackBar } from './snack-bar.model'

@Injectable()
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(snackBarData: ISnackBar): void {
    const data = { ...SNACK_BAR_DEFAULT, ...snackBarData }

    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: data.duration * 1000,
      data
    })
  }

}

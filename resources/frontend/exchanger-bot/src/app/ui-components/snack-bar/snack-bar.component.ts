import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar'

import { ESnackBarType, ISnackBar } from './snack-bar.model'

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SnackBarComponent {

  ESnackBarType = ESnackBarType

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: ISnackBar) {}

}

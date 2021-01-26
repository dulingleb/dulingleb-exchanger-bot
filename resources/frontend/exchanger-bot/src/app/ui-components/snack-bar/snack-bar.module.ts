import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { MatSnackBarModule } from '@angular/material/snack-bar'

import { SnackBarComponent } from './snack-bar.component'
import { SnackBarService } from './snack-bar.service'

@NgModule({
  declarations: [SnackBarComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    TranslateModule
  ],
  providers: [SnackBarService]
})
export class SnackBarModule {}

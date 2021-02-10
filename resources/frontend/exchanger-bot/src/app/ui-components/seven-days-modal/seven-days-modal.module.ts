import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { TranslateModule } from '@ngx-translate/core'

import { SevenDaysModalComponent } from './seven-days-modal.component'
import { SevenDaysModalService } from './seven-days-modal.service'

@NgModule({
  declarations: [SevenDaysModalComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    TranslateModule
  ],
  providers: [SevenDaysModalService]
})
export class SevenDaysModalModule {}

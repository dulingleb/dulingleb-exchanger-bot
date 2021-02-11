import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { TranslateModule } from '@ngx-translate/core'

import { ConfirmModalComponent } from './confirm-modal.component'
import { ConfirmModalService } from './confirm-modal.service'

@NgModule({
  declarations: [ConfirmModalComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    TranslateModule
  ],
  providers: [ConfirmModalService],
  exports: [ConfirmModalComponent]
})
export class ConfirmModalModule { }

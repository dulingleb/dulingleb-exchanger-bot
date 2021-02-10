import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { TranslateModule } from '@ngx-translate/core'

import { ImageModalComponent } from './image-modal.component'
import { ImageModalService } from './image-modal.service'

@NgModule({
  declarations: [ImageModalComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    TranslateModule
  ],
  providers: [ImageModalService]
})
export class ImageModalModule {}

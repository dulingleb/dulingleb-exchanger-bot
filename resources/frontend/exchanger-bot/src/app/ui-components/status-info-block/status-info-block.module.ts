import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { TranslateModule } from '@ngx-translate/core'

import { StatusInfoBlockComponent } from './status-info-block.component'

@NgModule({
  declarations: [StatusInfoBlockComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule
  ],
  exports: [StatusInfoBlockComponent],
})
export class StatusInfoBlockModule { }

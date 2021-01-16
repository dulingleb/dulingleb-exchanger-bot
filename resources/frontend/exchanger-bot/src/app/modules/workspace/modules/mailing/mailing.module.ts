import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'

import { MailingComponent } from './mailing.component'
import { MailingRoutingModule } from './mailing-routing.module'

@NgModule({
  declarations: [MailingComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MailingRoutingModule
  ],
  exports: [MailingComponent]
})
export class MailingModule {}

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { TranslateModule } from '@ngx-translate/core'
import { ReactiveFormsModule } from '@angular/forms'

import { PageContentLayoutModule } from '@ui/index'

import { MailingComponent } from './mailing.component'
import { MailingRoutingModule } from './mailing-routing.module'
import { MatInputModule } from '@angular/material/input'

@NgModule({
  declarations: [MailingComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    TranslateModule,
    ReactiveFormsModule,

    PageContentLayoutModule,
    MailingRoutingModule
  ],
  exports: [MailingComponent]
})
export class MailingModule {}

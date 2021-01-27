import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { TranslateModule } from '@ngx-translate/core'
import { ReactiveFormsModule } from '@angular/forms'

import { CKEditorModule } from '@ckeditor/ckeditor5-angular'

import { PageContentLayoutModule } from '@ui/index'

import { MailingComponent } from './mailing.component'
import { MailingRoutingModule } from './mailing-routing.module'

@NgModule({
  declarations: [MailingComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,

    CKEditorModule,

    TranslateModule,
    ReactiveFormsModule,

    PageContentLayoutModule,
    MailingRoutingModule
  ],
  exports: [MailingComponent]
})
export class MailingModule {}

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { TranslateModule } from '@ngx-translate/core'
import { CKEditorModule } from '@ckeditor/ckeditor5-angular'

import { ConfirmModalModule } from '@ui/confirm-modal'
import { PageContentTableModule } from '@ui/page-content-table'
import { PageContentLayoutModule } from '@ui/page-content-layout'

import { SettingMessageEditComponent, SettingMessagesComponent, SettingMessageTemplateEditComponent } from './containers'
import { SettingsMessagesRoutingModule } from './settings-messages-routing.module'

@NgModule({
  declarations: [
    SettingMessagesComponent,
    SettingMessageEditComponent,
    SettingMessageTemplateEditComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,

    CKEditorModule,
    TranslateModule,
    ReactiveFormsModule,

    ConfirmModalModule,
    PageContentTableModule,
    PageContentLayoutModule,

    SettingsMessagesRoutingModule
  ],
})
export class SettingsMessagesModule {}

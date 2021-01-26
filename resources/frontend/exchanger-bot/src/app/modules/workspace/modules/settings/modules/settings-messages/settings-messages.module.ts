import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { TranslateModule } from '@ngx-translate/core'

import { ConfirmModalModule, PageContentTableModule, PageContentLayoutModule } from '@ui/index'

import { SettingMessagesComponent } from './containers'
import { SettingsMessagesRoutingModule } from './settings-messages-routing.module'

@NgModule({
  declarations: [SettingMessagesComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
    ReactiveFormsModule,

    ConfirmModalModule,
    PageContentTableModule,
    PageContentLayoutModule,

    SettingsMessagesRoutingModule
  ],
})
export class SettingsMessagesModule {}

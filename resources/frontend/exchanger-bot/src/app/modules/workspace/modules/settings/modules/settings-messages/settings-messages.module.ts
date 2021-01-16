import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'

import { SettingsMessagesComponent } from './settings-messages.component'
import { SettingsMessagesRoutingModule } from './settings-messages-routing.module'

@NgModule({
  declarations: [SettingsMessagesComponent],
  imports: [
    CommonModule,
    MatCardModule,
    SettingsMessagesRoutingModule
  ],
  exports: [SettingsMessagesComponent]
})
export class SettingsMessagesModule {}

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'

import { SettingsComponent } from './settings.component'
import { SettingsRoutingModule } from './settings-routing.module'

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    SettingsRoutingModule
  ],
  exports: [SettingsComponent]
})
export class SettingsModule {}

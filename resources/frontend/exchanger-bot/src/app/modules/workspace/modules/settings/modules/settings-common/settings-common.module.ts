import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'

import { SettingsCommonComponent } from './settings-common.component'
import { SettingsCommonRoutingModule } from './settings-common-routing.module'

@NgModule({
  declarations: [SettingsCommonComponent],
  imports: [
    CommonModule,
    MatCardModule,
    SettingsCommonRoutingModule
  ],
  exports: [SettingsCommonComponent]
})
export class SettingsCommonModule {}

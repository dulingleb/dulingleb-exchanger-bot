import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'

import { SettingsCommissionComponent } from './settings-commission.component'
import { SettingsCommissionRoutingModule } from './settings-commission-routing.module'

@NgModule({
  declarations: [SettingsCommissionComponent],
  imports: [
    CommonModule,
    MatCardModule,
    SettingsCommissionRoutingModule
  ],
  exports: [SettingsCommissionComponent]
})
export class SettingsCommissionModule {}

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'

import { SettingsRequisitesComponent } from './settings-requisites.component'
import { SettingsRequisitesRoutingModule } from './settings-requisites-routing.module'

@NgModule({
  declarations: [SettingsRequisitesComponent],
  imports: [
    CommonModule,
    MatCardModule,
    SettingsRequisitesRoutingModule
  ],
  exports: [SettingsRequisitesComponent]
})
export class SettingsRequisitesModule {}

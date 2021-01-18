import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { SettingsCommissionComponent } from './settings-commission.component'

const routes: Routes = [ { path: '', component: SettingsCommissionComponent } ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsCommissionRoutingModule { }

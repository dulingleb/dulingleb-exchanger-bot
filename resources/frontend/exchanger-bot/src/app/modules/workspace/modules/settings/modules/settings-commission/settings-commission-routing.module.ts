import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { SettingsCommissionComponent, SettingsCommissionEditComponent, SettingsCommissionInfoComponent } from './containers'

const routes: Routes = [
  { path: '', component: SettingsCommissionComponent },
  { path: 'new', component: SettingsCommissionEditComponent },
  { path: ':id/edit', component: SettingsCommissionEditComponent },
  { path: ':id/info', component: SettingsCommissionInfoComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsCommissionRoutingModule { }

import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { SettingsRequisitesComponent } from './settings-requisites.component'

const routes: Routes = [ { path: '', component: SettingsRequisitesComponent } ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRequisitesRoutingModule { }

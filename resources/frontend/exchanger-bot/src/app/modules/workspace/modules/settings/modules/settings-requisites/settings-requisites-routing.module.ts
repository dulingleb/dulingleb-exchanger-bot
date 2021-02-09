import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { SettingsRequisitesComponent, SettingsRequisiteEditComponent, SettingsRequisiteInfoComponent } from './containers'

const routes: Routes = [
  { path: '', component: SettingsRequisitesComponent },
  { path: 'new', component: SettingsRequisiteEditComponent },
  { path: ':id/edit', component: SettingsRequisiteEditComponent },
  { path: ':id/info', component: SettingsRequisiteInfoComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRequisitesRoutingModule { }

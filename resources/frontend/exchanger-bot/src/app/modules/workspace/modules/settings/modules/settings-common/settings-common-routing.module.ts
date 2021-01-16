import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { SettingsCommonComponent } from './settings-common.component'

const routes: Routes = [ { path: '', component: SettingsCommonComponent } ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsCommonRoutingModule { }

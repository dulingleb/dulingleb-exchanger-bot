import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { SettingMessagesComponent } from './containers'

const routes: Routes = [ { path: '', component: SettingMessagesComponent } ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsMessagesRoutingModule { }

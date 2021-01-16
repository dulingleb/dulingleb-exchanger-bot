import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { SettingsMessagesComponent } from './settings-messages.component'

const routes: Routes = [ { path: '', component: SettingsMessagesComponent } ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsMessagesRoutingModule { }

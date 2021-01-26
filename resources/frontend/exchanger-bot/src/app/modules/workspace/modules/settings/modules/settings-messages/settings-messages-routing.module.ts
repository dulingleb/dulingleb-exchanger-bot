import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { SettingMessageEditComponent, SettingMessagesComponent, SettingMessageTemplateEditComponent } from './containers'

const routes: Routes = [
  { path: '', component: SettingMessagesComponent },
  { path: ':slug/edit', component: SettingMessageEditComponent },
  { path: 'template/new', component: SettingMessageTemplateEditComponent },
  { path: 'template/:id/edit', component: SettingMessageTemplateEditComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsMessagesRoutingModule { }

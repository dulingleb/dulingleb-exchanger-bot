import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { SuperAdminGuard } from '@core/guards'

import { SettingMessageEditComponent, SettingMessagesComponent, SettingMessageTemplateEditComponent } from './containers'

const routes: Routes = [
  { path: '', component: SettingMessagesComponent },
  { path: ':slug/edit', component: SettingMessageEditComponent },
  {
    path: 'template/new',
    component: SettingMessageTemplateEditComponent,
    canActivate: [SuperAdminGuard]
  },
  {
    path: 'template/:id/edit',
    component: SettingMessageTemplateEditComponent,
    canActivate: [SuperAdminGuard]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsMessagesRoutingModule { }

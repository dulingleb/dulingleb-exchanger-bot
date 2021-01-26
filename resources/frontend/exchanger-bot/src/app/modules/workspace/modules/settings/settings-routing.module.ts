import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { SettingsComponent } from './settings.component'

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      { path: 'common', loadChildren: () => import('./modules/settings-common').then(m => m.SettingsCommonModule) },
      { path: 'messages', loadChildren: () => import('./modules/settings-messages').then(m => m.SettingsMessagesModule) },
      { path: 'commissions', loadChildren: () => import('./modules/settings-commission').then(m => m.SettingsCommissionModule) },
      { path: 'requisites', loadChildren: () => import('./modules/settings-requisites').then(m => m.SettingsRequisitesModule) },
    ]
  },
  { path: '**', redirectTo: 'common' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule { }

import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { SuperAdminGuard } from '@core/guards'

import { WorkspaceComponent } from './workspace.component'

const routes: Routes = [
  {
    path: '',
    component: WorkspaceComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => import('./modules/dashboard').then(m => m.DashboardModule) },
      {
        path: 'admins',
        loadChildren: () => import('./modules/admins').then(m => m.AdminsModule),
        canActivate: [SuperAdminGuard]
      },
      { path: 'users', loadChildren: () => import('./modules/users').then(m => m.UsersModule) },
      { path: 'operations', loadChildren: () => import('./modules/operations').then(m => m.OperationsModule) },
      { path: 'mailing', loadChildren: () => import('./modules/mailing').then(m => m.MailingModule) },
      { path: 'settings', loadChildren: () => import('./modules/settings').then(m => m.SettingsModule) },
      { path: 'profile', loadChildren: () => import('./modules/profile').then(m => m.ProfileModule) },
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SuperAdminGuard]
})
export class WorkspaceRoutingModule {}

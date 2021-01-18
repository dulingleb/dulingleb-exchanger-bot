import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { AuthGuard, UserGuard } from '@core/guards'

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth').then(m => m.AuthModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./modules/workspace').then(m => m.WorkspaceModule),
    canActivate: [UserGuard]
  },
  { path: '**', redirectTo: '' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard, UserGuard],
  exports: [RouterModule],
})
export class AppRoutingModule {}

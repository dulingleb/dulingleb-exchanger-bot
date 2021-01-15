import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth').then(m => m.AuthModule),
  },
  {
    path: 'workspace',
    loadChildren: () => import('./modules/workspace').then(m => m.WorkspaceModule),
  },
  { path: '**', redirectTo: '/workspace' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

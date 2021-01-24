import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AdminEditComponent, AdminInfoComponent, AdminsComponent } from './containers'

const routes: Routes = [
  { path: '', component: AdminsComponent },
  { path: 'new', component: AdminEditComponent },
  { path: ':id/edit', component: AdminEditComponent },
  { path: ':id/info', component: AdminInfoComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminsRoutingModule { }

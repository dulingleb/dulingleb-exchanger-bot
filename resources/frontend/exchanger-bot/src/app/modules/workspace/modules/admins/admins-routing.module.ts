import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AdminEditComponent, AdminInfoComponent, AdminsComponent } from './containers'

const routes: Routes = [
  { path: '', component: AdminsComponent },
  { path: ':id/info', component: AdminInfoComponent },
  { path: ':id/edit', component: AdminEditComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminsRoutingModule { }

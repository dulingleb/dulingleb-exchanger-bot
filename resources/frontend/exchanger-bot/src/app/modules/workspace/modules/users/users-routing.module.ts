import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { UserEditComponent, UsersComponent } from './containers'

const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: ':id/edit', component: UserEditComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule { }

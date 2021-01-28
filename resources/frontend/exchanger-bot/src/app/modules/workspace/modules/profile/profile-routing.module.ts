import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ProfileComponent, ProfileEditComponent } from './containers'

const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'edit', component: ProfileEditComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule { }

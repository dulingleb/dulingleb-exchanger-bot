import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { OperationInfoComponent, OperationsComponent } from './containers'

const routes: Routes = [
  { path: '', component: OperationsComponent },
  { path: ':id/info', component: OperationInfoComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperationsRoutingModule { }

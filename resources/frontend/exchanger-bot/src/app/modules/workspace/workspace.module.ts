import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'

import { WorkspaceRoutingModule } from './workspace-routing.module'
import { WorkspaceComponent } from './workspace.component'
import { SnackBarModule } from '@ui/snack-bar'

@NgModule({
  declarations: [WorkspaceComponent],
  imports: [
    CommonModule,
    MatCardModule,
    SnackBarModule,
    WorkspaceRoutingModule
  ],
})
export class WorkspaceModule {}

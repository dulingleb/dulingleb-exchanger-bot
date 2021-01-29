import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { TranslateModule } from '@ngx-translate/core'

import { SnackBarModule } from '@ui/snack-bar'
import { StatusInfoBlockModule } from '@ui/status-info-block'

import {
  StatusInfoBlockOperationsCountComponent,
  StatusInfoBlockOperationsSummComponent,
  StatusInfoBlockStatisticComponent,
  StatusInfoBlockUsersComponent
} from './components'

import { WorkspaceRoutingModule } from './workspace-routing.module'
import { WorkspaceComponent } from './workspace.component'

@NgModule({
  declarations: [
    WorkspaceComponent,
    StatusInfoBlockUsersComponent,
    StatusInfoBlockStatisticComponent,
    StatusInfoBlockOperationsSummComponent,
    StatusInfoBlockOperationsCountComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    TranslateModule,

    StatusInfoBlockModule,
    SnackBarModule,
    WorkspaceRoutingModule
  ],
})
export class WorkspaceModule {}

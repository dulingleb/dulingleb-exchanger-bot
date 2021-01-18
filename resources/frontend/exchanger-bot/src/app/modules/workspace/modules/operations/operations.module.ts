import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'

import { OperationsComponent } from './operations.component'
import { OperationsRoutingModule } from './operations-routing.module'

@NgModule({
  declarations: [OperationsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    OperationsRoutingModule
  ],
  exports: [OperationsComponent]
})
export class OperationsModule {}

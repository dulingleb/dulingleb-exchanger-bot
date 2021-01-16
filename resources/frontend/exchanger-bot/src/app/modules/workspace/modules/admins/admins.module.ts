import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'

import { AdminsComponent } from './admins.component'
import { AdminsRoutingModule } from './admins-routing.module'

@NgModule({
  declarations: [AdminsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    AdminsRoutingModule
  ],
  exports: [AdminsComponent]
})
export class AdminsModule {}

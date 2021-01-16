import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'

import { UsersComponent } from './users.component'
import { UsersRoutingModule } from './users-routing.module'

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    MatCardModule,
    UsersRoutingModule
  ],
  exports: [UsersComponent]
})
export class UsersModule {}

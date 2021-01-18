import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'

import { ProfileComponent } from './profile.component'
import { ProfileRoutingModule } from './profile-routing.module'

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    MatCardModule,
    ProfileRoutingModule
  ],
  exports: [ProfileComponent]
})
export class ProfileModule {}

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'

import { AuthComponent } from './auth.component'
import { AuthRoutingModule } from './auth-routing.module'

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, AuthRoutingModule],
})
export class AuthModule {}
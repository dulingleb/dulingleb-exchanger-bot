import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { TranslateModule } from '@ngx-translate/core'

import { InputErrorModule } from '@ui/input-error'
import { PageContentLayoutModule } from '@ui/page-content-layout'

import { ProfileComponent, ProfileEditComponent } from './containers'
import { ProfileRoutingModule } from './profile-routing.module'

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileEditComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
    ReactiveFormsModule,

    PageContentLayoutModule,
    InputErrorModule,

    ProfileRoutingModule
  ],
})
export class ProfileModule {}

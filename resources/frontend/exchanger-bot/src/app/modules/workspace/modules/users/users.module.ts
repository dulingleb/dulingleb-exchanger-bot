import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatInputModule } from '@angular/material/input'
import { ReactiveFormsModule } from '@angular/forms'

import { PageContentLayoutModule } from '@ui/page-content-layout'
import { PageContentTableModule } from '@ui/page-content-table'
import { InputErrorModule } from '@ui/input-error'

import { UserEditComponent, UsersComponent } from './containers'
import { UsersRoutingModule } from './users-routing.module'

@NgModule({
  declarations: [
    UsersComponent,
    UserEditComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,

    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,

    PageContentTableModule,
    PageContentLayoutModule,
    UsersRoutingModule,
    InputErrorModule,
  ],
})
export class UsersModule {}

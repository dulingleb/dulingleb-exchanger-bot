import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { ReactiveFormsModule } from '@angular/forms'

import { ConfirmModalModule, PageContentLayoutModule, PageContentTableModule } from '@ui/index'

import { AdminEditComponent, AdminInfoComponent, AdminsComponent } from './containers'
import { AdminsRoutingModule } from './admins-routing.module'

@NgModule({
  declarations: [
    AdminsComponent,
    AdminInfoComponent,
    AdminEditComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
    ReactiveFormsModule,

    ConfirmModalModule,
    AdminsRoutingModule,
    PageContentTableModule,
    PageContentLayoutModule,
  ],
  exports: [AdminsComponent]
})
export class AdminsModule {}

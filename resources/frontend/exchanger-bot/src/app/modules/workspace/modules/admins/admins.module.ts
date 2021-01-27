import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { ReactiveFormsModule } from '@angular/forms'

import { ConfirmModalModule } from '@ui/confirm-modal'
import { PageContentTableModule } from '@ui/page-content-table'
import { PageContentLayoutModule } from '@ui/page-content-layout'

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
    PageContentTableModule,
    PageContentLayoutModule,

    AdminsRoutingModule,
  ],
  exports: [AdminsComponent]
})
export class AdminsModule {}

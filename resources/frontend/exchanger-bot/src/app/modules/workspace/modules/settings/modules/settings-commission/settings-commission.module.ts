import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { TranslateModule } from '@ngx-translate/core'

import { ConfirmModalModule } from '@ui/confirm-modal'
import { PageContentTableModule } from '@ui/page-content-table'
import { PageContentLayoutModule } from '@ui/page-content-layout'

import { SettingsCommissionComponent, SettingsCommissionEditComponent, SettingsCommissionInfoComponent } from './containers'
import { SettingsCommissionRoutingModule } from './settings-commission-routing.module'

@NgModule({
  declarations: [
    SettingsCommissionComponent,
    SettingsCommissionEditComponent,
    SettingsCommissionInfoComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    TranslateModule,
    ReactiveFormsModule,

    ConfirmModalModule,
    PageContentTableModule,
    PageContentLayoutModule,

    SettingsCommissionRoutingModule
  ],
  exports: [SettingsCommissionComponent]
})
export class SettingsCommissionModule {}

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'

import { PageContentLayoutModule } from '@ui/index'

import { SettingsCommonComponent } from './containers'
import { SettingsCommonRoutingModule } from './settings-common-routing.module'

@NgModule({
  declarations: [SettingsCommonComponent],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,

    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,

    PageContentLayoutModule,
    SettingsCommonRoutingModule
  ]
})
export class SettingsCommonModule {}

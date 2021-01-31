import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'

import { PageContentLayoutModule } from '@ui/page-content-layout'

import { SettingsCommonKeysComponent, SettingsCommonLimitsComponent, SettingsCommonTelegramComponent } from './components'
import { SettingsCommonRoutingModule } from './settings-common-routing.module'
import { SettingsCommonComponent } from './containers'

@NgModule({
  declarations: [
    SettingsCommonTelegramComponent,
    SettingsCommonLimitsComponent,
    SettingsCommonKeysComponent,
    SettingsCommonComponent
  ],
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

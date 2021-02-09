import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'

import { PageContentLayoutModule } from '@ui/page-content-layout'

import { SettingsCommonKeysComponent, SettingsCommonLimitsComponent, SettingsCommonModeComponent, SettingsCommonRefComponent, SettingsCommonTelegramComponent } from './components'
import { SettingsCommonRoutingModule } from './settings-common-routing.module'
import { SettingsCommonComponent } from './containers'

@NgModule({
  declarations: [
    SettingsCommonTelegramComponent,
    SettingsCommonLimitsComponent,
    SettingsCommonModeComponent,
    SettingsCommonKeysComponent,
    SettingsCommonRefComponent,
    SettingsCommonComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,

    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSlideToggleModule,

    PageContentLayoutModule,
    SettingsCommonRoutingModule
  ]
})
export class SettingsCommonModule {}

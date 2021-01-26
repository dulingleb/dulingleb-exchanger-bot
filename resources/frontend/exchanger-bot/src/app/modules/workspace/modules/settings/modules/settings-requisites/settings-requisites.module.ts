import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { TranslateModule } from '@ngx-translate/core'

import { ConfirmModalModule, PageContentTableModule, PageContentLayoutModule } from '@ui/index'

import { SettingsRequisitesComponent, SettingsRequisiteEditComponent, SettingsRequisiteInfoComponent  } from './containers'
import { SettingsRequisitesRoutingModule } from './settings-requisites-routing.module'

@NgModule({
  declarations: [
    SettingsRequisitesComponent,
    SettingsRequisiteEditComponent,
    SettingsRequisiteInfoComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    TranslateModule,
    ReactiveFormsModule,

    ConfirmModalModule,
    PageContentTableModule,
    PageContentLayoutModule,

    SettingsRequisitesRoutingModule
  ],
})
export class SettingsRequisitesModule {}

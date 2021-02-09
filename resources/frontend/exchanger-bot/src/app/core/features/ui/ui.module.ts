import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { TranslateModule } from '@ngx-translate/core'

import { SnackBarModule } from '@ui/snack-bar'
import { SevenDaysModalModule } from '@ui/seven-days-modal'

import { UiEffects } from './ui.effects'
import { UI_FACADE, UiFacade } from './ui.facade'
import { uiFeatureKey, uiReducer } from './ui.reducer'

const EFFECTS = [UiEffects]

@NgModule({
  imports: [
    StoreModule.forFeature(uiFeatureKey, uiReducer),
    EffectsModule.forFeature(EFFECTS),
    TranslateModule,
    SevenDaysModalModule,
    SnackBarModule
  ],
  providers: [
    ...EFFECTS,
    { provide: UI_FACADE, useClass: UiFacade }
  ]
})
export class UiModule {}

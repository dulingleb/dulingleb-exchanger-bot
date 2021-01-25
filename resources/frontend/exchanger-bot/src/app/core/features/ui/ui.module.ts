import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { SnackBarModule } from '@ui/snack-bar'

import { UiEffects } from './ui.effects'
import { UI_FACADE, UiFacade } from './ui.facade'
import { uiFeatureKey, uiReducer } from './ui.reducer'

const EFFECTS = [UiEffects]

@NgModule({
  imports: [
    StoreModule.forFeature(uiFeatureKey, uiReducer),
    EffectsModule.forFeature(EFFECTS),
    SnackBarModule
  ],
  providers: [
    ...EFFECTS,
    { provide: UI_FACADE, useClass: UiFacade }
  ]
})
export class UiModule {}

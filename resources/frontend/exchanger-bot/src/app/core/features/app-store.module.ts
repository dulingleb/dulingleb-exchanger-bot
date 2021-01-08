import { NgModule } from '@angular/core'

import { ROOT_MODULES } from '@env/environment'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { UiModule } from './ui'

@NgModule({
  imports: [
    StoreModule.forRoot([]),
    EffectsModule.forRoot([]),
    ...ROOT_MODULES,
    UiModule
  ]
})
export class AppStoreModule {}

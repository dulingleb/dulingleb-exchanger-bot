import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store'

import { ROOT_MODULES } from '@env/environment'

import { UiModule } from './ui'
import { UserModule } from './user'

@NgModule({
  imports: [
    StoreModule.forRoot({ router: routerReducer}),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([]),
    ...ROOT_MODULES,
    UserModule,
    UiModule
  ]
})
export class AppStoreModule {}

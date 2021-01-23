import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { USER_FACADE, UserFacade } from './user.facade'
import { userFeatureKey, userReducer } from './user.reducer'
import { UserEffects } from './user.effects'
import { UserService } from './user.service'

const EFFECTS = [UserEffects]

@NgModule({
  imports: [
    StoreModule.forFeature(userFeatureKey, userReducer),
    EffectsModule.forFeature(EFFECTS)
  ],
  providers: [
    ...EFFECTS,
    UserService,
    { provide: USER_FACADE, useClass: UserFacade }
  ]
})
export class UserModule {}
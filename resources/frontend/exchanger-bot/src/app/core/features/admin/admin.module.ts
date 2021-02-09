import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { adminFeatureKey, adminReducer } from './admin.reducer'
import { ADMIN_FACADE, AdminFacade } from './admin.facade'
import { AdminInfoService } from './admin.info.service'
import { AdminEffects } from './admin.effects'

const EFFECTS = [AdminEffects]

@NgModule({
  imports: [
    StoreModule.forFeature(adminFeatureKey, adminReducer),
    EffectsModule.forFeature(EFFECTS)
  ],
  providers: [
    ...EFFECTS,
    AdminInfoService,
    { provide: ADMIN_FACADE, useClass: AdminFacade }
  ]
})
export class AdminModule {}

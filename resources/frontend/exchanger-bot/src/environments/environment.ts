import { StoreDevtoolsModule } from '@ngrx/store-devtools'

export const environment = {
  production: false,
}

export const ROOT_MODULES = [
  StoreDevtoolsModule.instrument({
    maxAge: 25
  })
]

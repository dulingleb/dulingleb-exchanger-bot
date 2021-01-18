import { StoreDevtoolsModule } from '@ngrx/store-devtools'

export const ENV = {
  production: false,
  api: '/api-dul/api'
}

export const ROOT_MODULES = [
  StoreDevtoolsModule.instrument({
    maxAge: 25
  })
]

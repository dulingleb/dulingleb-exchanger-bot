import { StoreDevtoolsModule } from '@ngrx/store-devtools'

export const ENV = {
  production: false,
  api: 'http://dulingleb-bot.ru/api'
}

export const ROOT_MODULES = [
  StoreDevtoolsModule.instrument({
    maxAge: 25
  })
]

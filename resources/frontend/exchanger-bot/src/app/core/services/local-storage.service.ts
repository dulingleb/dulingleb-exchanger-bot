import { Injectable } from '@angular/core'

import { APP_DEFAULT_LANGUAGE, ELanguage } from '@core/features/ui/ui.model'

const SEVEN_DAYS_POPUP = 'SEVEN_DAYS_POPUP'
const IS_DARK_THEME = 'IS_DARK_THEME'
const TOKEN = 'TOKEN'
const LANGUAGE = 'LANGUAGE'

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  changeThemeMode(isDarkTheme: boolean): void {
    localStorage.setItem(IS_DARK_THEME, +isDarkTheme + '')
  }

  isDarkTheme(): boolean {
    return !!+localStorage.getItem(IS_DARK_THEME)
  }

  changeLanguage(language: ELanguage): void {
    localStorage.setItem(LANGUAGE, language)
  }

  getLanguage(): ELanguage {
    const language = localStorage.getItem(LANGUAGE) as ELanguage
    return Object.values(ELanguage).includes(language) ? language : APP_DEFAULT_LANGUAGE
  }

  saveToken(token: string): void {
    token
      ? localStorage.setItem(TOKEN, token)
      : this.clearToken()
  }

  getToken(): string {
    return localStorage.getItem(TOKEN) || ''
  }

  clearToken(): void {
    localStorage.removeItem(TOKEN)
  }

  saveSevenDaysPopup(): void {
    localStorage.setItem(SEVEN_DAYS_POPUP, String(true))
  }

  isShowedSevenDaysPopup(): boolean {
    return !!localStorage.getItem(SEVEN_DAYS_POPUP)
  }

}

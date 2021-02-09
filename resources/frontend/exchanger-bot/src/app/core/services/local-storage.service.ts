import { Injectable } from '@angular/core'

const SEVEN_DAYS_POPUP = 'SEVEN_DAYS_POPUP'
const IS_DARK_THEME = 'IS_DARK_THEME'
const TOKEN = 'TOKEN'

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

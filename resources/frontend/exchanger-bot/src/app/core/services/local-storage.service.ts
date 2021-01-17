import { Injectable } from '@angular/core'

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
    localStorage.setItem(TOKEN, token)
  }

  getToken(): string {
    return localStorage.getItem(TOKEN) || ''
  }

  clearToken(): void {
    localStorage.removeItem(TOKEN)
  }

}

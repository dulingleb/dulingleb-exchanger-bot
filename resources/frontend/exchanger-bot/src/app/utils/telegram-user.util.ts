import { ITelegramUserInDto } from '@core/models'

export const getTelegramUserName = (telegramUser: ITelegramUserInDto): string => {
  if (!telegramUser) { return '' }
  return telegramUser.username || (telegramUser.firstName || '') + ' ' + (telegramUser.lastName || '')
}

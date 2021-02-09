import { Pipe, PipeTransform } from '@angular/core'

import { ITelegramUserInDto } from '@core/models'
import { getTelegramUserName } from '@utils/index'

@Pipe({
  name: 'userName'
})
export class UserNamePipe implements PipeTransform {

  transform(telegramUser: ITelegramUserInDto): string {
    return getTelegramUserName(telegramUser)
  }

}

import { Pipe, PipeTransform } from '@angular/core'

import { IAdminInDto } from '@core/features'

@Pipe({
  name: 'logoName'
})
export class LogoNamePipe implements PipeTransform {

  transform(user: IAdminInDto): string {
    if (!user || !user.name) { return '' }
    return user.name.replace(/(.).*\s(.).*/i, '$1$2').substring(0, 2)
  }

}

import { Pipe, PipeTransform } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { Observable } from 'rxjs'

@Pipe({
  name: 'dayFormat'
})
export class DayFormatPipe implements PipeTransform {

  constructor(private translateService: TranslateService) {}

  transform(day: number): Observable<string> {
    let translateType = ''
    switch (day % 10) {
      case 1:
      case 2:
      case 3:
      case 4:
        translateType = 'day1'
        break
      default:
        translateType = 'day2'
        break
    }
    return this.translateService.get(`common.day.${translateType}`)
  }

}

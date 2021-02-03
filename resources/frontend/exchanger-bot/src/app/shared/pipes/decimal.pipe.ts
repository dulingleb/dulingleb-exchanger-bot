import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'decimal'
})
export class DecimalPipe implements PipeTransform {

  transform(data: number): string {
    return String(data).replace(/(\d{3})/g, '$1 ').replace(' .', '.').trim()
  }

}

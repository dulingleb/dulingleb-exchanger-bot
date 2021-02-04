import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'decimal'
})
export class DecimalPipe implements PipeTransform {

  transform(data: number): string {
    return new Intl.NumberFormat('ru-RU', { style: 'decimal' }).format(data)
  }

}

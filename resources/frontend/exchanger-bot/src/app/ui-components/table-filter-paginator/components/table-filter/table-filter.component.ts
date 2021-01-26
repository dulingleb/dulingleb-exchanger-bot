import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core'

import { IFilterField, IFilterValues } from '../../models'

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss']
})
export class TableFilterComponent implements OnChanges {

  @Output() filter = new EventEmitter<IFilterValues[]>()

  @Input() filterFields: IFilterField[]
  @Input() showFilter: boolean

  filterValues: IFilterValues[] = []
  disabledFilter = true

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.filterFields?.currentValue) {
      this.filterValues = this.filterFields.map(f => ({ name: f.name, value: '' }))
    }
  }

  onChangeValue(): void {
    this.disabledFilter = true
    this.filterValues.forEach(f => {
      if (f.value) { this.disabledFilter = false }
    })
  }

  clearValues(): void {
    this.disabledFilter = true
    this.filterValues = this.filterValues.map(f => ({ ...f, value: '' }))
    this.filter.emit([])
  }

  onFilter(): void {
    this.filter.emit(this.filterValues.reduce((filterValues, filterValue) => {
      if (filterValue.value) { filterValues.push(filterValue) }
      return filterValues
    }, []))
  }

}

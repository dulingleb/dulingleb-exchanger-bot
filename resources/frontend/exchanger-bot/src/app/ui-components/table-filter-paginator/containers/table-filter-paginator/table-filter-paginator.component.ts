import {
  Input,
  Output,
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges
} from '@angular/core'

import { IFilterField, IFilterValues, IPaginator } from '../../models/index'

@Component({
  selector: 'app-table-filter-paginator',
  templateUrl: './table-filter-paginator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableFilterPaginatorComponent implements OnChanges {

  @Output() changePaginator = new EventEmitter<IPaginator>()
  @Output() filter = new EventEmitter<IFilterField[]>()

  @Input() length: number
  @Input() pageSize: number
  @Input() pageIndex: number
  @Input() filterFields: IFilterField[]

  showFilter: boolean
  tableWithFilter: boolean

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.filterFields?.currentValue) {
      this.tableWithFilter = !!this.filterFields?.length
    }
  }

}

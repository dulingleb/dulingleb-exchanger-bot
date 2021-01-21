import { Input, Output, Component, EventEmitter } from '@angular/core'

import { IPaginator, IPaginatorEvent } from '../../models/index'

@Component({
  selector: 'app-table-paginator',
  templateUrl: './table-paginator.component.html',
  styleUrls: ['./table-paginator.component.scss']
})
export class TablePaginatorComponent {

  @Output() changePaginator = new EventEmitter<IPaginator>()
  @Output() changeFilter = new EventEmitter()

  @Input() length: number
  @Input() pageSize: number
  @Input() pageIndex: number
  @Input() showFilter: boolean
  @Input() tableWithFilter: boolean

  paginatorChanged(event: IPaginatorEvent): void {
    const paginatorValue: IPaginator = {
      page: event.pageIndex,
      pageSize: event.pageSize,
      length: event.length
    }

    this.changePaginator.emit(paginatorValue)
  }

}

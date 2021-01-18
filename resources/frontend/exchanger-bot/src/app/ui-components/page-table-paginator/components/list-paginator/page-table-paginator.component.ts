import {
  Input,
  Output,
  Component,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core'

import { IPaginator, IPaginatorEvent } from '../../models/index'

@Component({
  selector: 'app-page-table-paginator',
  templateUrl: './page-table-paginator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTablePaginatorComponent {

  @Output() public pageChange = new EventEmitter<IPaginator>()

  @Input() public length: number
  @Input() public pageIndex: number

  public paginatorChanged(event: IPaginatorEvent): void {
    const paginatorValue = {
      pageNumber: event.pageIndex,
      pageSize: event.pageSize,
    }

    this.pageChange.emit(paginatorValue)
  }
}

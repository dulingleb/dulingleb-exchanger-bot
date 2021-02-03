import {
  Input,
  Output,
  OnChanges,
  Component,
  ViewChild,
  EventEmitter,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core'
import { MatSort } from '@angular/material/sort'

import { ETableColumnActionEventType, ETableColumnActionType, ETableColumnType, ISortEvent, ITableActionEvent, ITableColumn } from '@core/models'
import { EAdminRoleDto } from '@core/features'
import { getTableColumnNames } from '@utils/index'

@Component({
  selector: 'app-content-table',
  templateUrl: './content-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentTableComponent implements OnChanges {

  @Output() eventData = new EventEmitter<ITableActionEvent>()
  @Output() sortData = new EventEmitter<ISortEvent>()

  @Input() items: []
  @Input() currentUserId: number
  @Input() tableColumns: ITableColumn[]
  @Input() currentUserRole: EAdminRoleDto

  @ViewChild(MatSort) sort: MatSort

  ETableColumnType = ETableColumnType
  ETableColumnActionType = ETableColumnActionType
  ETableColumnActionEventType = ETableColumnActionEventType

  columnNames: string[] = []

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.currentUserRole?.currentValue !== undefined) {
      this.columnNames = getTableColumnNames(this.tableColumns, this.currentUserRole)
    }
  }

  setEvent(event: ETableColumnActionEventType, data: any): void {
    this.eventData.emit({ event, data })
  }

}

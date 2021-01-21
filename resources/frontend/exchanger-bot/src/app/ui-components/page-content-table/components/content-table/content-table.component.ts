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

import { ETableColumnActionEventType, ETableColumnActionType, ETableColumnType, ISortEvent, ITableColumn } from '@core/models'
import { EUserRoleDto, IUserInDto } from '@core/features'
import { getTableColumnNames } from '@utils/index'

@Component({
  selector: 'app-content-table',
  templateUrl: './content-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentTableComponent implements OnChanges {

  @Output() delete = new EventEmitter<IUserInDto>()
  @Output() sortData = new EventEmitter<ISortEvent>()

  @Input() items: []
  @Input() tableColumns: ITableColumn[]
  @Input() currentUserRole: EUserRoleDto

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

}

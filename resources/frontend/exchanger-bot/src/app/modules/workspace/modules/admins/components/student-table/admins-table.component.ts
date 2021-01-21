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

import { EUserRoleDto, IUserInDto } from '@core/features'
import { getTableColumnNames } from '@utils/index'
import { ISortEvent } from '@core/models'

import { TABLE_COLUMNS } from '../../constants/table-columns'

@Component({
  selector: 'app-admins-table',
  templateUrl: './admins-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminsTableComponent implements OnChanges {

  @Output() delete = new EventEmitter<IUserInDto>()
  @Output() sortData = new EventEmitter<ISortEvent>()

  @Input() list: IUserInDto[]
  @Input() currentUserRole: EUserRoleDto

  @ViewChild(MatSort) sort: MatSort

  columnNames: string[] = []

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.currentUserRole?.currentValue !== undefined) {
      this.columnNames = getTableColumnNames(TABLE_COLUMNS, this.currentUserRole)
    }
  }

}

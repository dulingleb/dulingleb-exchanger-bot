import {
  Input,
  Output,
  OnChanges,
  Component,
  EventEmitter,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core'

import { EUserRoleDto, IUserInDto } from '@core/features'
import { getTableColumnNames } from '@utils/index'

import { TABLE_COLUMNS } from '../../constants/table-columns'

@Component({
  selector: 'app-admins-table',
  templateUrl: './admins-table.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminsTableComponent implements OnChanges {

  @Output() delete = new EventEmitter<IUserInDto>()

  @Input() list: IUserInDto[]
  @Input() currentUserRole: EUserRoleDto

  columnNames: string[] = []

  ngOnChanges(changes: SimpleChanges): void {
    console.log('list', this.list)
    console.log('currentUserRole', this.currentUserRole)
    if (changes.currentUserRole?.currentValue !== undefined) {
      this.columnNames = getTableColumnNames(TABLE_COLUMNS, this.currentUserRole)
      console.log('this.columnNames', this.columnNames)
    }
  }
}

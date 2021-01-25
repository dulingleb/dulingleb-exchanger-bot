import { EUserRoleDto } from '@core/features'
import { ETableColumnActionEventType, ETableColumnActionType, ETableColumnType, IOperationInDto, ITableColumn } from '@core/models'

export const TABLE_COLUMNS: ITableColumn[] = [
  {
    name: 'id',
    nameI18n: 'operations.table.id',
    type: ETableColumnType.STRING,
    allowedForRoles: [EUserRoleDto.SUPER_ADMIN, EUserRoleDto.ADMIN],
  },
  {
    name: 'username',
    nameI18n: 'operations.table.username',
    type: ETableColumnType.STRING,
    allowedForRoles: [EUserRoleDto.SUPER_ADMIN, EUserRoleDto.ADMIN],
  },
  {
    name: 'amount',
    nameI18n: 'operations.table.amount',
    type: ETableColumnType.STRING,
    allowedForRoles: [EUserRoleDto.SUPER_ADMIN, EUserRoleDto.ADMIN],
  },
  {
    name: 'price',
    nameI18n: 'operations.table.price',
    type: ETableColumnType.STRING,
    allowedForRoles: [EUserRoleDto.SUPER_ADMIN, EUserRoleDto.ADMIN],
  },
  {
    name: 'status',
    nameI18n: 'operations.table.status',
    type: ETableColumnType.STRING,
    translate: (operation: IOperationInDto): string => `operation.status.${operation.status}`,
    allowedForRoles: [EUserRoleDto.SUPER_ADMIN, EUserRoleDto.ADMIN],
  },
  {
    name: 'info',
    nameI18n: 'table.action.info',
    type: ETableColumnType.STRING,
    actionData: {
      link: (operation: IOperationInDto): string => `/operations/${operation?.id}/info`,
      actionType: ETableColumnActionType.LINK,
      eventType: ETableColumnActionEventType.INFO
    },
    allowedForRoles: [EUserRoleDto.SUPER_ADMIN, EUserRoleDto.ADMIN],
  }
]

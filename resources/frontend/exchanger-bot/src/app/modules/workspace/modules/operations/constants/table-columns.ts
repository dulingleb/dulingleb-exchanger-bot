import { EAdminRoleDto } from '@core/features'
import { getTelegramUserName } from '@utils/index'
import { ETableColumnActionEventType, ETableColumnActionType, ETableColumnType, IOperationInDto, ITableColumn } from '@core/models'

import { OPERATION_CLASS } from './operation.model'

export const TABLE_COLUMNS: ITableColumn[] = [
  {
    name: 'id',
    nameI18n: 'operations.table.id',
    type: ETableColumnType.STRING,
    sort: true,
    allowedForRoles: [EAdminRoleDto.SUPER_ADMIN, EAdminRoleDto.ADMIN],
  },
  {
    name: 'username',
    value: (operation: IOperationInDto): string => getTelegramUserName(operation.telegramUser),
    nameI18n: 'operations.table.username',
    type: ETableColumnType.STRING,
    allowedForRoles: [EAdminRoleDto.SUPER_ADMIN, EAdminRoleDto.ADMIN],
  },
  {
    name: 'amount',
    nameI18n: 'operations.table.amount',
    type: ETableColumnType.STRING,
    sort: true,
    allowedForRoles: [EAdminRoleDto.SUPER_ADMIN, EAdminRoleDto.ADMIN],
  },
  {
    name: 'price',
    nameI18n: 'operations.table.price',
    type: ETableColumnType.STRING,
    sort: true,
    allowedForRoles: [EAdminRoleDto.SUPER_ADMIN, EAdminRoleDto.ADMIN],
  },
  {
    name: 'status',
    nameI18n: 'operations.table.status',
    type: ETableColumnType.STRING,
    class: (operation: IOperationInDto): string => OPERATION_CLASS[operation.status],
    translate: (operation: IOperationInDto): string => `operation.status.${operation.status}`,
    sort: true,
    allowedForRoles: [EAdminRoleDto.SUPER_ADMIN, EAdminRoleDto.ADMIN],
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
    allowedForRoles: [EAdminRoleDto.SUPER_ADMIN, EAdminRoleDto.ADMIN],
  }
]

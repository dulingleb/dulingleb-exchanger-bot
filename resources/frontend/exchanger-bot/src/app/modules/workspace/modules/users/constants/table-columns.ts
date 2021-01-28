import { EUserRoleDto } from '@core/features'
import { ETableColumnActionEventType, ETableColumnActionType, ETableColumnType, ITableColumn, ITelegramUserInDto } from '@core/models'

export const TABLE_COLUMNS: ITableColumn[] = [
  {
    name: 'username',
    nameI18n: 'users.table.username',
    type: ETableColumnType.STRING,
    allowedForRoles: [EUserRoleDto.SUPER_ADMIN, EUserRoleDto.ADMIN],
  },
  {
    name: 'operationsCount',
    nameI18n: 'users.table.operationsCount',
    type: ETableColumnType.STRING,
    allowedForRoles: [EUserRoleDto.SUPER_ADMIN, EUserRoleDto.ADMIN],
  },
  {
    name: 'operationsSumm',
    nameI18n: 'users.table.operationsSumm',
    type: ETableColumnType.STRING,
    allowedForRoles: [EUserRoleDto.SUPER_ADMIN, EUserRoleDto.ADMIN],
  },
  {
    name: 'ban',
    nameI18n: 'users.table.ban',
    type: ETableColumnType.STRING,
    icon: (item: ITelegramUserInDto): string => item.ban ? 'clear' : 'done',
    class: (item: ITelegramUserInDto): string => item.ban ? 'text-warn' : 'text-success',
    allowedForRoles: [EUserRoleDto.SUPER_ADMIN, EUserRoleDto.ADMIN],
  },
  {
    name: 'edit',
    nameI18n: 'table.action.edit',
    type: ETableColumnType.STRING,
    actionData: {
      link: (item: ITelegramUserInDto): string => `/users/${item.id}/edit`,
      actionType: ETableColumnActionType.LINK,
      eventType: ETableColumnActionEventType.EDIT
    },
    allowedForRoles: [EUserRoleDto.SUPER_ADMIN, EUserRoleDto.ADMIN],
  }
]

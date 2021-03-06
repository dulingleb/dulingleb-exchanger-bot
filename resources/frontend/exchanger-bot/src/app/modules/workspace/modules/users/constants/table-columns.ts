import { EAdminRoleDto } from '@core/features'

import { ETableColumnActionEventType, ETableColumnActionType, ETableColumnType, ITableColumn, ITelegramUserInDto } from '@core/models'
import { getTelegramUserName } from '@utils/index'

export const TABLE_COLUMNS: ITableColumn[] = [
  {
    name: 'username',
    nameI18n: 'users.table.username',
    value: (item: ITelegramUserInDto): string => getTelegramUserName(item),
    type: ETableColumnType.STRING,
    sort: true,
    allowedForRoles: [EAdminRoleDto.SUPER_ADMIN, EAdminRoleDto.ADMIN],
  },
  {
    name: 'operationsCount',
    nameI18n: 'users.table.operationsCount',
    type: ETableColumnType.STRING,
    sort: true,
    allowedForRoles: [EAdminRoleDto.SUPER_ADMIN, EAdminRoleDto.ADMIN],
  },
  {
    name: 'operationsSum',
    nameI18n: 'users.table.operationsSum',
    type: ETableColumnType.STRING,
    sort: true,
    allowedForRoles: [EAdminRoleDto.SUPER_ADMIN, EAdminRoleDto.ADMIN],
  },
  {
    name: 'discount',
    nameI18n: 'users.table.discount',
    type: ETableColumnType.STRING,
    sort: true,
    allowedForRoles: [EAdminRoleDto.SUPER_ADMIN, EAdminRoleDto.ADMIN],
  },
  {
    name: 'ban',
    nameI18n: 'users.table.ban',
    type: ETableColumnType.STRING,
    icon: (item: ITelegramUserInDto): string => item.ban ? 'clear' : 'done',
    class: (item: ITelegramUserInDto): string => item.ban ? 'text-warn' : 'text-accent',
    allowedForRoles: [EAdminRoleDto.SUPER_ADMIN, EAdminRoleDto.ADMIN],
  },
  {
    name: 'edit',
    nameI18n: 'table.action.edit',
    type: ETableColumnType.STRING,
    actionData: {
      link: (item: ITelegramUserInDto): string => `/users/${item.id}/edit`,
      actionType: ETableColumnActionType.LINK,
      eventType: ETableColumnActionEventType.INFO
    },
    allowedForRoles: [EAdminRoleDto.SUPER_ADMIN, EAdminRoleDto.ADMIN],
  }
]

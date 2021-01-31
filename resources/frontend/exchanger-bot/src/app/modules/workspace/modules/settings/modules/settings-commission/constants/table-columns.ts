import { EUserRoleDto } from '@core/features'
import { ETableColumnActionEventType, ETableColumnActionType, ETableColumnType, ISettingCommissionDto, ITableColumn } from '@core/models'

export const TABLE_COLUMNS: ITableColumn[] = [
  {
    name: 'from',
    nameI18n: 'settings.commissions.table.from',
    type: ETableColumnType.STRING,
    sort: true,
    allowedForRoles: [EUserRoleDto.SUPER_ADMIN, EUserRoleDto.ADMIN],
  },
  {
    name: 'to',
    nameI18n: 'settings.commissions.table.to',
    sort: true,
    type: ETableColumnType.STRING,
    allowedForRoles: [EUserRoleDto.SUPER_ADMIN, EUserRoleDto.ADMIN],
  },
  {
    name: 'percent',
    nameI18n: 'settings.commissions.table.percent',
    type: ETableColumnType.STRING,
    sort: true,
    allowedForRoles: [EUserRoleDto.SUPER_ADMIN, EUserRoleDto.ADMIN],
  },
  {
    name: 'info',
    nameI18n: 'table.action.info',
    type: ETableColumnType.STRING,
    actionData: {
      link: (commission: ISettingCommissionDto): string => `/settings/commissions/${commission?.id}/info`,
      actionType: ETableColumnActionType.LINK,
      eventType: ETableColumnActionEventType.INFO
    },
    allowedForRoles: [EUserRoleDto.SUPER_ADMIN, EUserRoleDto.ADMIN],
  },
  {
    name: 'edit',
    nameI18n: 'table.action.edit',
    type: ETableColumnType.STRING,
    actionData: {
      link: (commission: ISettingCommissionDto): string => `/settings/commissions/${commission?.id}/edit`,
      actionType: ETableColumnActionType.LINK,
      eventType: ETableColumnActionEventType.EDIT
    },
    allowedForRoles: [EUserRoleDto.SUPER_ADMIN, EUserRoleDto.ADMIN],
  },
  {
    name: 'delete',
    nameI18n: 'table.action.delete',
    type: ETableColumnType.STRING,
    actionData: {
      actionType: ETableColumnActionType.EVENT,
      eventType: ETableColumnActionEventType.DELETE,
    },
    allowedForRoles: [EUserRoleDto.SUPER_ADMIN, EUserRoleDto.ADMIN]
  }
]

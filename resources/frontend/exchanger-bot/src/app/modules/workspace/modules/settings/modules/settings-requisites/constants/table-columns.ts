import { EUserRoleDto } from '@core/features'
import { ETableColumnActionEventType, ETableColumnActionType, ETableColumnType, ISettingRequisiteDto, ITableColumn } from '@core/models'

export const TABLE_COLUMNS: ITableColumn[] = [
  {
    name: 'title',
    nameI18n: 'settings.requisites.table.title',
    type: ETableColumnType.STRING,
    sort: true,
    allowedForRoles: [EUserRoleDto.SUPER_ADMIN, EUserRoleDto.ADMIN],
  },
  {
    name: 'status',
    nameI18n: 'settings.requisites.table.status',
    icon: (item: ISettingRequisiteDto): string => item.status ? 'done' : 'clear',
    class: (item: ISettingRequisiteDto): string => item.status ? 'text-success' : 'text-warn',
    type: ETableColumnType.STRING,
    sort: true,
    allowedForRoles: [EUserRoleDto.SUPER_ADMIN, EUserRoleDto.ADMIN],
  },
  {
    name: 'info',
    nameI18n: 'table.action.info',
    type: ETableColumnType.STRING,
    actionData: {
      link: (requisite: ISettingRequisiteDto): string => `/settings/requisites/${requisite?.id}/info`,
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
      link: (requisite: ISettingRequisiteDto): string => `/settings/requisites/${requisite?.id}/edit`,
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

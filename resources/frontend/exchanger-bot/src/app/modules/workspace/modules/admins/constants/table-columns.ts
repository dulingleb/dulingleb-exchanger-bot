import { EAdminRoleDto, IAdminInDto } from '@core/features'
import { ETableColumnActionEventType, ETableColumnActionType, ETableColumnType, ITableColumn } from '@core/models'

export const TABLE_COLUMNS: ITableColumn[] = [
  {
    name: 'name',
    nameI18n: 'admins.table.name',
    sort: true,
    type: ETableColumnType.STRING,
    allowedForRoles: [EAdminRoleDto.SUPER_ADMIN],
  },
  {
    name: 'email',
    nameI18n: 'admins.table.email',
    sort: true,
    type: ETableColumnType.STRING,
    allowedForRoles: [EAdminRoleDto.SUPER_ADMIN],
  },
  {
    name: 'role',
    nameI18n: 'admins.table.role',
    type: ETableColumnType.STRING,
    class: (user: IAdminInDto): string => user.role === EAdminRoleDto.SUPER_ADMIN ? 'text-primary': 'text-success',
    translate: (user: IAdminInDto): string => `common.roles.${user.role}`,
    allowedForRoles: [EAdminRoleDto.SUPER_ADMIN],
  },
  {
    name: 'createdAt',
    nameI18n: 'admins.table.createdAt',
    type: ETableColumnType.DATE,
    allowedForRoles: [EAdminRoleDto.SUPER_ADMIN],
  },
  {
    name: 'info',
    nameI18n: 'table.action.info',
    type: ETableColumnType.STRING,
    actionData: {
      link: (user: IAdminInDto): string => `/admins/${user?.id}/info`,
      actionType: ETableColumnActionType.LINK,
      eventType: ETableColumnActionEventType.INFO
    },
    allowedForRoles: [EAdminRoleDto.SUPER_ADMIN],
  },
  {
    name: 'edit',
    nameI18n: 'table.action.edit',
    type: ETableColumnType.STRING,
    actionData: {
      link: (user: IAdminInDto): string => `/admins/${user?.id}/edit`,
      actionType: ETableColumnActionType.LINK,
      eventType: ETableColumnActionEventType.EDIT
    },
    allowedForRoles: [EAdminRoleDto.SUPER_ADMIN],
  },
  {
    name: 'delete',
    nameI18n: 'table.action.delete',
    type: ETableColumnType.STRING,
    actionData: {
      actionType: ETableColumnActionType.EVENT,
      eventType: ETableColumnActionEventType.DELETE,
      hide: (user: IAdminInDto, currentUserId: number): boolean => user?.id === currentUserId
    },
    allowedForRoles: [EAdminRoleDto.SUPER_ADMIN]
  }
]

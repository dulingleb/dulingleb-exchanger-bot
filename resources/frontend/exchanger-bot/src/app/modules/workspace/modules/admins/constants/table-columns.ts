import { EUserRoleDto, IUserInDto } from '@core/features'
import { ETableColumnActionEventType, ETableColumnActionType, ETableColumnType, ITableColumn } from '@core/models'

export const TABLE_COLUMNS: ITableColumn[] = [
  {
    name: 'name',
    nameI18n: 'admins.table.name',
    type: ETableColumnType.STRING,
    allowedForRoles: [EUserRoleDto.SUPER_ADMIN, EUserRoleDto.ADMIN],
  },
  {
    name: 'email',
    nameI18n: 'admins.table.email',
    type: ETableColumnType.STRING,
    allowedForRoles: [EUserRoleDto.SUPER_ADMIN, EUserRoleDto.ADMIN],
  },
  // {
  //   name: 'role',
  //   nameI18n: 'admins.table.role',
  //   type: ETableColumnType.STRING,
  //   translate: (user: IUserInDto): string => `common.roles.${user.role}`,
  //   allowedForRoles: [EUserRoleDto.SUPER_ADMIN, EUserRoleDto.ADMIN],
  // },
  {
    name: 'createdAt',
    nameI18n: 'admins.table.createdAt',
    type: ETableColumnType.DATE,
    allowedForRoles: [EUserRoleDto.SUPER_ADMIN, EUserRoleDto.ADMIN],
  },
  {
    name: 'info',
    nameI18n: 'table.action.info',
    type: ETableColumnType.STRING,
    actionData: {
      link: (user: IUserInDto): string => `/admins/${user?.id}/info`,
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
      link: (user: IUserInDto): string => `/admins/${user?.id}/edit`,
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
      hide: (user: IUserInDto, currentUserId: number): boolean => user?.id === currentUserId
    },
    allowedForRoles: [EUserRoleDto.SUPER_ADMIN, EUserRoleDto.ADMIN]
  }
]

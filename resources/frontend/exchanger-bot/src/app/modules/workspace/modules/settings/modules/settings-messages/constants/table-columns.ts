import { EAdminRoleDto } from '@core/features'
import { ETableColumnActionEventType, ETableColumnActionType, ETableColumnType, ISettingMessageDto, ITableColumn } from '@core/models'

export const TABLE_COLUMNS: ITableColumn[] = [
  {
    name: 'title',
    nameI18n: 'settings.messages.table.title',
    type: ETableColumnType.STRING,
    sort: true,
    allowedForRoles: [EAdminRoleDto.SUPER_ADMIN, EAdminRoleDto.ADMIN],
  },
  {
    name: 'slug',
    nameI18n: 'settings.messages.table.slug',
    type: ETableColumnType.STRING,
    allowedForRoles: [EAdminRoleDto.SUPER_ADMIN, EAdminRoleDto.ADMIN],
  },
  {
    name: 'info',
    nameI18n: 'table.action.info',
    type: ETableColumnType.STRING,
    actionData: {
      link: (message: ISettingMessageDto): string => `/settings/messages/${message?.slug}/edit`,
      actionType: ETableColumnActionType.LINK,
      eventType: ETableColumnActionEventType.EDIT
    },
    allowedForRoles: [EAdminRoleDto.SUPER_ADMIN, EAdminRoleDto.ADMIN],
  },
  {
    name: 'edit',
    nameI18n: 'table.action.edit',
    type: ETableColumnType.STRING,
    actionData: {
      icon: 'backup_table',
      link: (message: ISettingMessageDto): string => `/settings/messages/template/${message?.id}/edit`,
      actionType: ETableColumnActionType.LINK,
      eventType: ETableColumnActionEventType.EDIT
    },
    allowedForRoles: [EAdminRoleDto.SUPER_ADMIN],
  }
]

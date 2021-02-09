import { EAdminRoleDto } from '@core/features'
import { ITableColumn } from '@core/models'

export const getTableColumnNames = (tableColumns: ITableColumn[], userRole: EAdminRoleDto): string[] => {
  const columnNames: string[] = tableColumns.filter((column) =>
    column.allowedForRoles.some((role) => role === userRole)
  ).map((col) => col.name)

  return columnNames
}

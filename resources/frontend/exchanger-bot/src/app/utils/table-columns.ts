import { EUserRoleDto } from '@core/features'
import { TableColumn } from '@core/models'

export const getTableColumnNames = (tableColumns: TableColumn[], userRole: EUserRoleDto): string[] => {
  const columnNames: string[] = tableColumns.filter((column) =>
    column.allowedForRoles.some((role) => role === userRole)
  ).map((col) => col.name)

  return columnNames
}

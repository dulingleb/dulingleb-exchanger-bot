import { EUserRoleDto } from '../features/user'

export interface TableColumn {
  name: string;
  allowedForRoles: EUserRoleDto[];
}

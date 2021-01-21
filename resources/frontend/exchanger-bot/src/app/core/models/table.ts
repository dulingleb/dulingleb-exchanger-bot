import { EUserRoleDto } from '../features/user'

export interface ITableColumn {
  name: string;
  allowedForRoles: EUserRoleDto[];
}

export interface ISortEvent {
  active: string;
  direction: 'asc' | 'desc' | '';
}

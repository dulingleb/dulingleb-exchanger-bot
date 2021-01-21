import { EUserRoleDto } from '../features/user'

export interface ITableColumn {
  name: string;
  nameI18n: string;
  type: ETableColumnType;
  allowedForRoles: EUserRoleDto[];
  actionData?: {
    icon?: string;
    link?: (item: any) => string;
    actionType: ETableColumnActionType;
    eventType?: ETableColumnActionEventType;
  };
}

export enum ETableColumnType {
  STRING,
  DATE
}

export enum ETableColumnActionType {
  LINK,
  EVENT
}

export enum ETableColumnActionEventType {
  INFO,
  EDIT,
  DELETE
}

export interface ISortEvent {
  active: string;
  direction: 'asc' | 'desc' | '';
}

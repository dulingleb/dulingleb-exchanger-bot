import { EUserRoleDto } from '../features/user'

export interface ITableColumn {
  name: string;
  value?: (...args: any) => string;
  nameI18n: string;
  type: ETableColumnType;
  icon?: (...args: any) => string;
  class?: (...args: any) => string;
  allowedForRoles: EUserRoleDto[];
  translate?: (...args: any) => string;
  actionData?: {
    icon?: string;
    link?: (...args: any) => string;
    actionType: ETableColumnActionType;
    eventType?: ETableColumnActionEventType;
    hide?: (...args: any) => boolean;
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

export interface ITableActionEvent {
  event: ETableColumnActionEventType;
  data: any;
}

export interface ISortEvent {
  active: string;
  direction: 'asc' | 'desc' | '';
}

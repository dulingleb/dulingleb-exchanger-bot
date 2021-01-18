export enum EGlobalNotificationType {
  SUCCESS = 'success',
  WARNING = 'warning',
  DANGER = 'danger',
  INFO = 'info'
}

export interface IGlobalNotification {
  type: EGlobalNotificationType;
  timeout?: number;
  msg: string;
}

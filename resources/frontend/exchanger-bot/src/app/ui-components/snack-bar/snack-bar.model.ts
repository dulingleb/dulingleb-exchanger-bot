export interface ISnackBar {
  messageI18n?: string;
  messageKeyI18n?: { [key: string]: string };
  type?: ESnackBarType;
  duration?: number;
}

export enum ESnackBarType {
  INFO,
  ERROR
}

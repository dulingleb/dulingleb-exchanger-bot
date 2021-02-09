export enum EOperationStatus {
  IN_PAY = 1,
  SUCCESS = 2,
  ERROR = 3,
  IN_SEND_CHECK = 4,
  ON_CHECK = 5,
  CANCEL = 6
}

export const OPERATION_CLASS = {
  [EOperationStatus.IN_PAY]: 'text-black',
  [EOperationStatus.SUCCESS]: 'text-accent',
  [EOperationStatus.ERROR]: 'text-warn',
  [EOperationStatus.IN_SEND_CHECK]: 'text-gray',
  [EOperationStatus.ON_CHECK]: 'text-gray',
  [EOperationStatus.CANCEL]: 'text-gray'
}


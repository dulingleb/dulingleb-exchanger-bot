import { ISnackBar, ESnackBarType } from './snack-bar.model'

export const SNACK_BAR_DEFAULT: ISnackBar = {
  messageI18n: '',
  messageKeyI18n: {},
  type: ESnackBarType.INFO,
  duration: 10
}

export interface ICommonLimitSetting {
  course: number;
  minExchange: number;
  maxExchange: number;
}

export interface ICommonTelegramSetting {
  telegramToken: string;
  username: string;
}

export interface ICommonKeysSetting {
  coinbaseKey: string;
  coinbaseSecret: string;
}

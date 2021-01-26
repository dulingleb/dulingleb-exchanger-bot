import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, mergeMap } from 'rxjs/operators'
import { Observable, of, throwError } from 'rxjs'

import { ENV } from '@env/environment'
import {
  ICommonResponseDto,
  IRequestApiDto,
  IResponseApiInDto,
  IResponseApiOutDto,
  ISettingInDto,
  ISettingKeysInDto,
  ISettingKeysOutDto,
  ISettingLimitInDto,
  ISettingLimitOutDto,
  ISettingMessageDto,
  ISettingOutDto,
  ISettingTelegramInDto,
  ISettingTelegramOutDto
} from '@core/models'
import { apiQueryToParams, operationOutToInDto } from '@utils/index'
import { EFilterUserInOut } from '@core/features'

@Injectable({
  providedIn: 'root',
})
export class SettingApiService {

  constructor(private http: HttpClient) {}

  getSettings(): Observable<ISettingInDto> {
    return this.http.get<ICommonResponseDto<ISettingOutDto>>(`${ENV.api}/settings`).pipe(
      mergeMap(res => res.status ? of(res) : throwError(new Error(res.message))),
      map(({ data }) => this.settingOutToInDto(data))
    )
  }

  saveLimits(settingLimitInDto: ISettingLimitInDto): Observable<ISettingInDto> {
    const data: ISettingLimitOutDto = {
      course: settingLimitInDto.course,
      min_exchange: settingLimitInDto.minExchange,
      max_exchange: settingLimitInDto.maxExchange
    }
    return this.http.patch<ICommonResponseDto<ISettingOutDto>>(`${ENV.api}/settings/set/limits`, data).pipe(
      mergeMap(res => res.status ? of(res) : throwError(new Error(res.message))),
      map(({ data }) => this.settingOutToInDto(data))
    )
  }

  saveTelegram(settingTelegramInDto: ISettingTelegramInDto): Observable<ISettingInDto> {
    const data: ISettingTelegramOutDto = {
      username: settingTelegramInDto.username,
      telegram_token: settingTelegramInDto.telegramToken
    }
    return this.http.patch<ICommonResponseDto<ISettingOutDto>>(`${ENV.api}/settings/set/telegram-token`, data).pipe(
      mergeMap(res => res.status ? of(res) : throwError(new Error(res.message))),
      map(({ data }) => this.settingOutToInDto(data))
    )
  }

  saveKeys(settingKeysInDto: ISettingKeysInDto): Observable<ISettingInDto> {
    const data: ISettingKeysOutDto = {
      coinbase_key: settingKeysInDto.coinbaseKey,
      coinbase_secret: settingKeysInDto.coinbaseSecret
    }
    return this.http.patch<ICommonResponseDto<ISettingOutDto>>(`${ENV.api}/settings/set/coinbase-key`, data).pipe(
      mergeMap(res => res.status ? of(res) : throwError(new Error(res.message))),
      map(({ data }) => this.settingOutToInDto(data))
    )
  }

  getMessageList(apiQuery: IRequestApiDto): Observable<IResponseApiInDto<ISettingMessageDto[]>> {
    const params = apiQueryToParams(apiQuery, EFilterUserInOut)
    return this.http.get<ICommonResponseDto<IResponseApiOutDto<ISettingMessageDto[]>>>(`${ENV.api}/settings/messages`, { params }).pipe(
      mergeMap(res => res.status ? of(res) : throwError(new Error(res.message))),
      map(({ data: res }) => ({
        ...operationOutToInDto(res),
        sort: apiQuery.sort
      }))
    )
  }

  getMessage(slug: string): Observable<ISettingMessageDto> {
    return this.http.get<ICommonResponseDto<ISettingMessageDto>>(`${ENV.api}/settings/messages/${slug}`).pipe(
      mergeMap(res => res.status ? of(res) : throwError(new Error(res.message))),
      map(({ data: message }) => message)
    )
  }

  updateMessage(id: number, text: string): Observable<ICommonResponseDto<null>> {
    return this.http.patch<ICommonResponseDto<null>>(`${ENV.api}/settings/messages/${id}/update`, { text }).pipe(
      mergeMap(res => res.status ? of(res) : throwError(new Error(res.message)))
    )
  }

  getMessageTemplate(id: number): Observable<ISettingMessageDto> {
    return this.http.get<ICommonResponseDto<ISettingMessageDto>>(`${ENV.api}/settings/messages/template/${id}`).pipe(
      mergeMap(res => res.status ? of(res) : throwError(new Error(res.message))),
      map(({ data: message }) => message)
    )
  }

  updateMessageTemplate(message: ISettingMessageDto): Observable<ICommonResponseDto<ISettingMessageDto>> {
    return this.http.patch<ICommonResponseDto<ISettingMessageDto>>(`${ENV.api}/settings/messages/template/${message.id}/update`, message).pipe(
      mergeMap(res => res.status ? of(res) : throwError(new Error(res.message)))
    )
  }

  private settingOutToInDto(setting: ISettingOutDto): ISettingInDto {
    return {
      id: setting.id,
      username: setting.username,
      coinbaseKey: setting.coinbase_key,
      coinbaseSecret: setting.coinbase_secret,
      course: setting.course,
      maxExchange: setting.max_exchange,
      minExchange: setting.min_exchange,
      status: setting.status,
      telegramToken: setting.telegram_token,
      userId: setting.user_id,
      createdAt: new Date(setting.created_at),
      updatedAt: new Date(setting.updated_at),
      deletedAt: new Date(setting.deleted_at)
    }
  }

}

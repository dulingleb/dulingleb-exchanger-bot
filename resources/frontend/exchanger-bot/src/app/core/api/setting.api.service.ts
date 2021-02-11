import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

import { ENV } from '@env/environment'
import {
  ICommonResponseDto,
  IRequestApiDto,
  IResponseApiInDto,
  IResponseApiOutDto,
  ISettingCommissionDto,
  ISettingInDto,
  ISettingKeysInDto,
  ISettingKeysOutDto,
  ISettingLimitInDto,
  ISettingLimitOutDto,
  ISettingMessageDto,
  ISettingOutDto,
  ISettingRefInDto,
  ISettingRefOutDto,
  ISettingRequisiteDto,
  ISettingTelegramInDto,
  ISettingTelegramOutDto
} from '@core/models'
import { apiQueryToParams, operationOutToInDto } from '@utils/index'
import { EFilterAdminInOut } from '@core/features'

@Injectable({
  providedIn: 'root',
})
export class SettingApiService {

  constructor(private http: HttpClient) {}

  getSettings(): Observable<ISettingInDto> {
    return this.http.get<ICommonResponseDto<ISettingOutDto>>(`${ENV.api}/settings`).pipe(
      map(({ data }) => this.settingOutToInDto(data))
    )
  }

  saveLimits(settingLimitInDto: ISettingLimitInDto): Observable<ICommonResponseDto<ISettingInDto>> {
    const data: ISettingLimitOutDto = {
      course: settingLimitInDto.course,
      min_exchange: settingLimitInDto.minExchange,
      max_exchange: settingLimitInDto.maxExchange
    }
    return this.http.patch<ICommonResponseDto<ISettingOutDto>>(`${ENV.api}/settings/set/limits`, data).pipe(
      map((res) => ({ ...res, data: this.settingOutToInDto(res.data) }))
    )
  }

  saveRef(settingRefInDto: ISettingRefInDto): Observable<ICommonResponseDto<ISettingInDto>> {
    const data: ISettingRefOutDto = {
      ref_percent: settingRefInDto.refPercent,
      ref_users_count: settingRefInDto.refUsersCount
    }
    return this.http.patch<ICommonResponseDto<ISettingOutDto>>(`${ENV.api}/settings/set/ref`, data).pipe(
      map((res) => ({ ...res, data: this.settingOutToInDto(res.data) }))
    )
  }

  saveMode(demo: boolean): Observable<ICommonResponseDto<ISettingInDto>> {
    const data = { demo }
    return this.http.patch<ICommonResponseDto<ISettingOutDto>>(`${ENV.api}/settings/set/demo`, data).pipe(
      map((res) => ({ ...res, data: this.settingOutToInDto(res.data) }))
    )
  }

  saveTelegram(settingTelegramInDto: ISettingTelegramInDto): Observable<ICommonResponseDto<ISettingInDto>> {
    const data: ISettingTelegramOutDto = {
      username: settingTelegramInDto.username,
      telegram_token: settingTelegramInDto.telegramToken
    }
    return this.http.patch<ICommonResponseDto<ISettingOutDto>>(`${ENV.api}/settings/set/telegram-token`, data).pipe(
      map((res) => ({ ...res, data: this.settingOutToInDto(res.data) }))
    )
  }

  saveKeys(settingKeysInDto: ISettingKeysInDto): Observable<ICommonResponseDto<ISettingInDto>> {
    const data: ISettingKeysOutDto = {
      coinbase_key: settingKeysInDto.coinbaseKey,
      coinbase_secret: settingKeysInDto.coinbaseSecret
    }
    return this.http.patch<ICommonResponseDto<ISettingOutDto>>(`${ENV.api}/settings/set/coinbase-key`, data).pipe(
      map((res) => ({ ...res, data: this.settingOutToInDto(res.data) }))
    )
  }

  getMessageList(apiQuery: IRequestApiDto): Observable<IResponseApiInDto<ISettingMessageDto[]>> {
    const params = apiQueryToParams(apiQuery, EFilterAdminInOut)
    return this.http.get<ICommonResponseDto<IResponseApiOutDto<ISettingMessageDto[]>>>(`${ENV.api}/settings/messages`, { params }).pipe(
      map(({ data: res }) => ({
        ...operationOutToInDto(res),
        sort: apiQuery.sort
      }))
    )
  }

  getMessage(slug: string): Observable<ISettingMessageDto> {
    return this.http.get<ICommonResponseDto<ISettingMessageDto>>(`${ENV.api}/settings/messages/${slug}`).pipe(
      map(({ data: message }) => message)
    )
  }

  updateMessage(id: number, text: string): Observable<ICommonResponseDto<ISettingMessageDto>> {
    return this.http.patch<ICommonResponseDto<ISettingMessageDto>>(`${ENV.api}/settings/messages/${id}/update`, { text })
  }

  getMessageTemplate(id: number): Observable<ISettingMessageDto> {
    return this.http.get<ICommonResponseDto<ISettingMessageDto>>(`${ENV.api}/settings/messages/template/${id}`).pipe(
      map(({ data: message }) => message)
    )
  }

  addMessageTemplate(message: ISettingMessageDto): Observable<ICommonResponseDto<ISettingMessageDto>> {
    return this.http.post<ICommonResponseDto<ISettingMessageDto>>(`${ENV.api}/settings/messages/template/store`, message)
  }

  updateMessageTemplate(message: ISettingMessageDto): Observable<ICommonResponseDto<ISettingMessageDto>> {
    return this.http.patch<ICommonResponseDto<ISettingMessageDto>>(`${ENV.api}/settings/messages/template/${message.id}/update`, message)
  }

  deleteMessageTemplate(id: number): Observable<ICommonResponseDto<null>> {
    return this.http.delete<ICommonResponseDto<null>>(`${ENV.api}/settings/messages/template/${id}`)
  }

  getCommissionList(apiQuery: IRequestApiDto): Observable<IResponseApiInDto<ISettingCommissionDto[]>> {
    const params = apiQueryToParams(apiQuery, EFilterAdminInOut)
    return this.http.get<ICommonResponseDto<IResponseApiOutDto<ISettingCommissionDto[]>>>(`${ENV.api}/settings/commissions`, { params }).pipe(
      map(({ data: res }) => ({
        ...operationOutToInDto(res),
        sort: apiQuery.sort
      }))
    )
  }

  getCommission(id: number): Observable<ISettingCommissionDto> {
    return this.http.get<ICommonResponseDto<ISettingCommissionDto>>(`${ENV.api}/settings/commissions/${id}`).pipe(
      map(({ data: message }) => message)
    )
  }

  addCommission(commission: ISettingCommissionDto): Observable<ICommonResponseDto<ISettingCommissionDto>> {
    return this.http.post<ICommonResponseDto<ISettingCommissionDto>>(`${ENV.api}/settings/commissions`, commission)
  }

  updateCommission(commission: ISettingCommissionDto): Observable<ICommonResponseDto<ISettingCommissionDto>> {
    return this.http.put<ICommonResponseDto<ISettingCommissionDto>>(`${ENV.api}/settings/commissions/${commission.id}`, commission)
  }

  deleteCommission(id: number): Observable<ICommonResponseDto<null>> {
    return this.http.delete<ICommonResponseDto<null>>(`${ENV.api}/settings/commissions/${id}`)
  }

  getRequisiteList(apiQuery: IRequestApiDto): Observable<IResponseApiInDto<ISettingRequisiteDto[]>> {
    const params = apiQueryToParams(apiQuery, EFilterAdminInOut)
    return this.http.get<ICommonResponseDto<IResponseApiOutDto<ISettingRequisiteDto[]>>>(`${ENV.api}/settings/bank-details`, { params }).pipe(
      map(({ data: res }) => ({
        ...operationOutToInDto(res),
        sort: apiQuery.sort
      }))
    )
  }

  getRequisite(id: number): Observable<ISettingRequisiteDto> {
    return this.http.get<ICommonResponseDto<ISettingRequisiteDto>>(`${ENV.api}/settings/bank-details/${id}`).pipe(
      map(({ data: message }) => message)
    )
  }

  addRequisite(requisite: ISettingRequisiteDto): Observable<ICommonResponseDto<ISettingRequisiteDto>> {
    return this.http.post<ICommonResponseDto<ISettingRequisiteDto>>(`${ENV.api}/settings/bank-details`, requisite)
  }

  updateRequisite(requisite: ISettingRequisiteDto): Observable<ICommonResponseDto<ISettingRequisiteDto>> {
    return this.http.put<ICommonResponseDto<ISettingRequisiteDto>>(`${ENV.api}/settings/bank-details/${requisite.id}`, requisite)
  }

  deleteRequisite(id: number): Observable<ICommonResponseDto<null>> {
    return this.http.delete<ICommonResponseDto<null>>(`${ENV.api}/settings/bank-details/${id}`)
  }

  getStatus(): Observable<boolean> {
    return this.http.get<ICommonResponseDto<boolean>>(`${ENV.api}/settings/status`).pipe(
      map(({ data: status }) => !!status)
    )
  }

  changeStatus(): Observable<boolean> {
    return this.http.post<ICommonResponseDto<boolean>>(`${ENV.api}/settings/status`, {}).pipe(
      map(({ data: status }) => !!status)
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
      demo: setting.demo,
      refUsersCount: setting.ref_users_count,
      refPercent: setting.ref_percent,
      createdAt: new Date(setting.created_at),
      updatedAt: new Date(setting.updated_at),
      deletedAt: new Date(setting.deleted_at)
    }
  }

}

import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, mergeMap } from 'rxjs/operators'
import { Observable, of, throwError } from 'rxjs'

import { ENV } from '@env/environment'
import { apiQueryToParams, operationOutToInDto, telegramUserOutToInDto } from '@utils/index'
import {
  EFilterTelegramUserInOut,
  ITelegramUserDataDto,
  ITelegramUserOutDto,
  ICommonResponseDto,
  ITelegramUserInDto,
  IResponseApiOutDto,
  IResponseApiInDto,
  IRequestApiDto,
} from '@core/models'

@Injectable({
  providedIn: 'root',
})
export class TelegramUserApiService {

  constructor(private http: HttpClient) {}

  getList(apiQuery: IRequestApiDto): Observable<IResponseApiInDto<ITelegramUserInDto[]>> {
    const params = apiQueryToParams(apiQuery, EFilterTelegramUserInOut)
    return this.http.get<ICommonResponseDto<IResponseApiOutDto<ITelegramUserOutDto[]>>>(`${ENV.api}/telegram-users`, { params }).pipe(
      mergeMap(res => res.status ? of(res) : throwError(new Error(res.message))),
      map(({ data: res }) => ({
        ...operationOutToInDto(res),
        sort: apiQuery.sort,
        data: res.data.map(user => telegramUserOutToInDto(user))
      }))
    )
  }

  getUser(id: number): Observable<ITelegramUserInDto> {
    return this.http.get<ICommonResponseDto<ITelegramUserOutDto>>(`${ENV.api}/telegram-users/${id}`).pipe(
      mergeMap(res => res.status ? of(res) : throwError(new Error(res.message))),
      map(({ data: user }) => telegramUserOutToInDto(user))
    )
  }

  updateUser(userData: ITelegramUserDataDto): Observable<any> {
    return this.http.put<ICommonResponseDto<ITelegramUserDataDto>>(`${ENV.api}/telegram-users/${userData.id}/update`, userData).pipe(
      mergeMap(res => res.status ? of(res) : throwError(new Error(res.message)))
    )
  }

}

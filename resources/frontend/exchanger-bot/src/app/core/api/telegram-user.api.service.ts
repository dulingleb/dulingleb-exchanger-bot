import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

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
  ETelegramUserRole,
} from '@core/models'

@Injectable({
  providedIn: 'root',
})
export class TelegramUserApiService {

  constructor(private http: HttpClient) {}

  getList(apiQuery: IRequestApiDto): Observable<IResponseApiInDto<ITelegramUserInDto[]>> {
    const params = apiQueryToParams(apiQuery, EFilterTelegramUserInOut)
    return this.http.get<ICommonResponseDto<IResponseApiOutDto<ITelegramUserOutDto[]>>>(`${ENV.api}/telegram-users`, { params }).pipe(
      map(({ data: res }) => ({
        ...operationOutToInDto(res),
        sort: apiQuery.sort,
        data: res.data.map(user => telegramUserOutToInDto(user))
      }))
    )
  }

  getUser(id: number): Observable<ITelegramUserInDto> {
    return this.http.get<ICommonResponseDto<ITelegramUserOutDto>>(`${ENV.api}/telegram-users/${id}`).pipe(
      map(({ data: user }) => telegramUserOutToInDto(user))
    )
  }

  updateUser(userData: ITelegramUserDataDto): Observable<ICommonResponseDto<ITelegramUserDataDto>> {
    return this.http.put<ICommonResponseDto<ITelegramUserDataDto>>(`${ENV.api}/telegram-users/${userData.id}/update`, userData)
  }

  appointAdmin(userId: number, role: ETelegramUserRole): Observable<ICommonResponseDto<{ role: ETelegramUserRole }>> {
    const data = { role }
    return this.http.put<ICommonResponseDto<{ role: ETelegramUserRole }>>(`${ENV.api}/telegram-users/${userId}/set-as-admin`, data)
  }

  existsAdmin(): Observable<boolean> {
    return this.http.get<ICommonResponseDto<boolean>>(`${ENV.api}/telegram-users/exists-admin`).pipe(
      map(({ data }) => !!data)
    )
  }

}

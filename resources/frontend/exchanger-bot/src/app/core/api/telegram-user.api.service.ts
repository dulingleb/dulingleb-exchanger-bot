import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

import { ENV } from '@env/environment'
import { apiQueryToParams } from '@utils/index'
import { IRequestApiDto, IResponseApiInDto, IResponseApiOutDto, ITelegramUserInDto, ITelegramUserOutDto } from '@core/models'

@Injectable({
  providedIn: 'root',
})
export class TelegramUserApiService {

  constructor(private http: HttpClient) {}

  getList(apiQuery: IRequestApiDto): Observable<IResponseApiInDto<ITelegramUserInDto[]>> {
    const params = apiQueryToParams(apiQuery)
    return this.http.get<IResponseApiOutDto<ITelegramUserOutDto[]>>(`${ENV.api}/telegram-users`, { params }).pipe(
      map(res => ({
        currentPage: res.current_page,
        page: res.from,
        lastPage: res.last_page,
        pageSize: res.per_page,
        to: res.to,
        total: res.total,
        sort: apiQuery.sort,
        data: res.data.map(user => ({
          id: user.id,
          username: user.username,
          exchangerId: user.exchanger_id,
          telegramUserId: user.telegram_user_id,
          operationsCount: user.operations_count
        }))
      }))
    )
  }

}

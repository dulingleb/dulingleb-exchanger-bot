import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, mergeMap } from 'rxjs/operators'
import { Observable, of, throwError } from 'rxjs'

import { ENV } from '@env/environment'
import { apiQueryToParams, operationOutToInDto, telegramUserOutToInDto } from '@utils/index'
import { EFilterOperationInOut, ICommonResponseDto, IOperationInDto, IOperationOutDto, IRequestApiDto, IResponseApiInDto, IResponseApiOutDto } from '@core/models'

@Injectable({
  providedIn: 'root',
})
export class OperationApiService {

  constructor(private http: HttpClient) {}

  getList(apiQuery: IRequestApiDto): Observable<IResponseApiInDto<IOperationInDto[]>> {
    const params = apiQueryToParams(apiQuery, EFilterOperationInOut)
    return this.http.get<ICommonResponseDto<IResponseApiOutDto<IOperationOutDto[]>>>(`${ENV.api}/operations`, { params }).pipe(
      mergeMap(res => res.status ? of(res) : throwError(new Error(res.message))),
      map(({ data: res }) => ({
        ...operationOutToInDto(res),
        sort: apiQuery.sort,
        data: res.data.map(operation => this.operationOutToInDto(operation))
      }))
    )
  }

  getOperation(id: number): Observable<IOperationInDto> {
    return this.http.get<ICommonResponseDto<IOperationOutDto>>(`${ENV.api}/operations/${id}`).pipe(
      mergeMap(res => res.status ? of(res) : throwError(new Error(res.message))),
      map(({ data: operation }) => this.operationOutToInDto(operation))
    )
  }

  addComment(id: number, comment: string): Observable<ICommonResponseDto<IOperationInDto>> {
    return this.http.put<ICommonResponseDto<IOperationOutDto>>(`${ENV.api}/operations/${id}/add-comment`, { comment }).pipe(
      mergeMap(res => res.status ? of(res) : throwError(new Error(res.message))),
      map(res => ({ ...res, data: this.operationOutToInDto(res.data) }))
    )
  }

  private operationOutToInDto(operation: IOperationOutDto): IOperationInDto {
    return {
      id: operation.id,
      amount: operation.amount,
      price: operation.price,
      telegramUserId: operation.telegram_user_id,
      bankDetailId: operation.bank_detail_id,
      btcAddress: operation.btc_address,
      comment: operation.comment,
      exchangerId: operation.exchanger_id,
      files: operation.files,
      linkTransaction: operation.link_transaction,
      status: operation.status,
      messageId: operation.message_id,
      createdAt: new Date(operation.created_at),
      updatedAt: new Date(operation.updated_at),
      telegramUser: telegramUserOutToInDto(operation.telegram_user)
    }
  }

}

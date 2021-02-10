import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

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
      map(({ data: res }) => ({
        ...operationOutToInDto(res),
        sort: apiQuery.sort,
        data: res.data.map(operation => this.operationOutToInDto(operation))
      }))
    )
  }

  getOperation(id: number): Observable<IOperationInDto> {
    return this.http.get<ICommonResponseDto<IOperationOutDto>>(`${ENV.api}/operations/${id}`).pipe(
      map(({ data: operation }) => this.operationOutToInDto(operation))
    )
  }

  addComment(id: number, comment: string): Observable<ICommonResponseDto<IOperationInDto>> {
    return this.http.put<ICommonResponseDto<IOperationOutDto>>(`${ENV.api}/operations/${id}/add-comment`, { comment }).pipe(
      map(res => ({ ...res, data: this.operationOutToInDto(res.data) }))
    )
  }

  setSuccess(id: number): Observable<ICommonResponseDto<any>> {
    return this.http.put<ICommonResponseDto<any>>(`${ENV.api}/operations/${id}/success`, {}).pipe(
      map(res => ({ ...res }))
    )
  }

  setCancel(id: number): Observable<ICommonResponseDto<any>> {
    return this.http.put<ICommonResponseDto<any>>(`${ENV.api}/operations/${id}/cancel`, {}).pipe(
      map(res => ({ ...res }))
    )
  }

  setToOperator(id: number): Observable<ICommonResponseDto<any>> {
    return this.http.post<ICommonResponseDto<any>>(`${ENV.api}/operations/${id}/direct-to-operator`, {}).pipe(
      map(res => ({ ...res }))
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
      files: operation.files || [],
      linkTransaction: operation.link_transaction,
      status: operation.status,
      messageId: operation.message_id,
      createdAt: new Date(operation.created_at),
      updatedAt: new Date(operation.updated_at),
      telegramUser: telegramUserOutToInDto(operation.telegram_user),
      bankDetails: operation.bank_details
    }
  }

}

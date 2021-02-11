import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { ENV } from '@env/environment'
import { ICommonResponseDto } from '@core/models'

@Injectable({
  providedIn: 'root',
})
export class MailingApiService {

  constructor(private http: HttpClient) {}

  addMessage(message: string): Observable<ICommonResponseDto<string>> {
    return this.http.post<ICommonResponseDto<string>>(`${ENV.api}/mailing`, { message })
  }

}

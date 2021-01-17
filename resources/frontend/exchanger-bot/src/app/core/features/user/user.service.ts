import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { ENV } from '@env/environment'

import { IUserLoginInDto, IUserLoginOutDto } from './user.model'
import { map } from 'rxjs/operators'

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<IUserLoginInDto> {
    return this.http.post<IUserLoginOutDto>(`${ENV.api}/auth/login`, { email, password }).pipe(
      map(userData => ({
        accessToken: userData.access_token,
        tokenType: userData.token_type,
        expiresIn: userData.expires_in,
        user: {
          id: userData.user.id,
          name: userData.user.name,
          email: userData.user.email,
          role: userData.user.role_id,
          createdAt: userData.user.created_at,
          updatedAt: userData.user.updated_at
        }
      }))
    )
  }

}

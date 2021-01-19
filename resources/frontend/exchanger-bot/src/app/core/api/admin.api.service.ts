import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ENV } from '@env/environment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AdminApiService {

  constructor(private http: HttpClient) {}

  getList(): Observable<any> {
    return this.http.get(ENV.api)
  }

}

import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'

import { AdminApiService } from '@core/api'
import { mergeMap } from 'rxjs/operators'

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
})
export class AdminEditComponent implements OnInit {

  userId: number

  constructor(
    private route: ActivatedRoute,
    private adminApiService: AdminApiService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      mergeMap((params: ParamMap) => this.adminApiService.getUser(+params.get('id')))
    ).subscribe(({ status, data }) =>  {
      console.log(status, data)
      // this.adminApiService.updateUser({ ...data, name: 'Дмитрий' }).subscribe(a => console.log(a))
      // this.adminApiService.addUser({
      //   name: 'test',
      //   email: 'test@test.com',
      //   password: 'test',
      //   cPassword: 'test'
      // }).subscribe(a => console.log(a))
      // this.adminApiService.deleteUser(data.id).subscribe(a => console.log('aaa', a))
    })
  }
}

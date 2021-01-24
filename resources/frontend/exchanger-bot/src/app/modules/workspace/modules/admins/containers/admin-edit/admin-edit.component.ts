import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { mergeMap, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'

import { AdminApiService } from '@core/api'
import { IUserInDto } from '@core/features'

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
})
export class AdminEditComponent implements OnInit, OnDestroy {

  user: IUserInDto
  form: FormGroup
  showPassword: boolean

  private destroy$ = new Subject()

  constructor(
    private route: ActivatedRoute,
    private adminApiService: AdminApiService
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      name: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        // Validators.required,
        Validators.minLength(3)
      ]),
      confirmPassword: new FormControl('', [
        // Validators.required,
        Validators.minLength(3)
      ])
    })
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      mergeMap((params: ParamMap) => this.adminApiService.getUser(+params.get('id'))),
      takeUntil(this.destroy$)
    ).subscribe(user =>  {
      this.user = user
      this.form.patchValue({
        email: user.email,
        name: user.name
      })
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

  save(): void {
    const email = this.form.get('email').value
    const name = this.form.get('name').value
    this.adminApiService.updateUser({
      id: this.user.id,
      email: email || this.user.email,
      name: name || this.user.name
    }).subscribe(res => console.log(res))
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}

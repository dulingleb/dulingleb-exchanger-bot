import { Component, OnInit } from '@angular/core'

import { IPaginator } from '@ui/index'

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
})
export class AdminsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  changePage(page: IPaginator): void {
    console.log(page)
  }

}

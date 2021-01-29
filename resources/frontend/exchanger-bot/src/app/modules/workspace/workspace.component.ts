import { Component, Inject, OnInit } from '@angular/core'

import { IUserFacade, USER_FACADE } from '@core/features'

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {

  constructor(@Inject(USER_FACADE) public userFacade: IUserFacade) {}

  ngOnInit(): void {}

}

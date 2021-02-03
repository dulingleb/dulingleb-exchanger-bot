import { Component, Inject, OnInit } from '@angular/core'

import { IAdminFacade, ADMIN_FACADE } from '@core/features'

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {

  constructor(@Inject(ADMIN_FACADE) public adminFacade: IAdminFacade) {}

  ngOnInit(): void {}

}

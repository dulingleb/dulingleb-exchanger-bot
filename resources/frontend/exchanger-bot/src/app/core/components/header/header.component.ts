import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core'

import { IUiFacade, UI_FACADE, IAdminFacade, ADMIN_FACADE } from '@core/features'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  isDarkTheme: boolean

  constructor(
    @Inject(UI_FACADE) public uiFacade: IUiFacade,
    @Inject(ADMIN_FACADE) public adminFacade: IAdminFacade
  ) {}

  ngOnInit(): void {
    this.uiFacade.isDarkTheme$.subscribe(themeMode => this.isDarkTheme = themeMode)
  }

}

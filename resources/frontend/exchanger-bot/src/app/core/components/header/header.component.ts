import { Component, Inject, OnInit } from '@angular/core'

import { IUiFacade, UI_FACADE } from '@core/features'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isDarkTheme: boolean

  constructor(@Inject(UI_FACADE) public uiFacade: IUiFacade) {}

  ngOnInit(): void {
    this.uiFacade.isDarkTheme$.subscribe(themeMode => this.isDarkTheme = themeMode)
  }
}

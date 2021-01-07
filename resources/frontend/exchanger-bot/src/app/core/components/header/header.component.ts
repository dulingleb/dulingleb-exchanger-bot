import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() changeTheme = new EventEmitter<boolean>();

  isDarkTheme: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  // TODO: Use Store
  switchTheme(): void {
    this.changeTheme.emit(this.isDarkTheme);
  }

}

import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-status-info-block',
  templateUrl: './status-info-block.component.html',
  styleUrls: ['./status-info-block.component.scss']
})
export class StatusInfoBlockComponent implements OnInit {

  @Input() blockNameI18n: string
  @Input() blockInfo: string | number
  @Input() icon: string

  constructor() {}

  ngOnInit(): void {}

}

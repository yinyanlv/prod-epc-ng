import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 's-tab-item',
  templateUrl: './tab-item.html',
  styleUrls: ['./tab-item.scss']
})
export class TabItemComponent {

  @Input()
  public title: string = 'tab';

  @Input()
  public active: boolean = false;

  @Input()
  public item: any;
}

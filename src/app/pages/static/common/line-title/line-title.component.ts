import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-line-title',
  templateUrl: './line-title.html',
  styleUrls: ['./line-title.scss']
})
export class LineTitleComponent {
  @Input() public title: string = '';
}

import {Component, Input} from '@angular/core';

@Component({
  selector: 's-poppicker',
  templateUrl: './poppicker.html',
  styleUrls: ['./poppicker.scss']
})
export class PoppickerComponent {
  @Input() title: string;
  @Input() iconType: string;
}

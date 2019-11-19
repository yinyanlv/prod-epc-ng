import {Component} from '@angular/core';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.html',
  styleUrls: ['./catalog.scss']
})
export class CatalogComponent {
  public isExpand = false;

  items = [{}, {}, {}];
}

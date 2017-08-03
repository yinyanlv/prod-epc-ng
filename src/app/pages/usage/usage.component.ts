import { Component, OnInit, ViewChild} from '@angular/core';


@Component({
  selector: 'app-usage',
  templateUrl: './usage.html',
  styleUrls: ['./usage.scss']
})
export class UsageComponent implements OnInit {

  @ViewChild('legend')
  legend;

  constructor() { }
  ngOnInit() {

  }
}

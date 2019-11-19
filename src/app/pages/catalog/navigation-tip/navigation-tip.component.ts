import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

const MESSAGE_ITEMS = {
  A: '请先选择左侧车系图片',
  B: '选择的车系配置不存在，请重新选择'
};

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-navigation-tip',
  templateUrl: './navigation-tip.html',
  styleUrls: ['./navigation-tip.scss']
})
export class NavigationTipComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  private message: string = MESSAGE_ITEMS.A;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['t'] === '1') {
        this.message = MESSAGE_ITEMS.B;
      }
    });
  }
}

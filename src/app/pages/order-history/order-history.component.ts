import {Component, ViewEncapsulation, OnInit, Input} from '@angular/core';
import {OrderHistoryService} from './order-history.service';
import {Router, ActivatedRoute} from '@angular/router';
import {GlobalConfigService} from '../../services/global-config.service';
import {SModalService} from '../../components/dialog/dialog.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-order-history',
  templateUrl: './order-history.html',
  styleUrls: ['./order-history.scss']
})
export class OrderHistoryComponent implements OnInit {

  public list: Array<any> = [];

  public constructor(
    private orderHistoryService: OrderHistoryService,
    private gcService: GlobalConfigService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: SModalService
  ) {
  }

  // 初始勾子
  public ngOnInit() {
    this.loadOrderList();
  }

  // 加载订单历史
  private loadOrderList() {
    this.orderHistoryService.getOrderHistoryList({}, data => this.list = data);
  }

  // 删除单个
  public deleteSingle(item) {

    this.dialog.open({
      title: '提示',
      width: 400,
      content: '您确认删除此购物清单吗？',
      onOk: () => {
        // TODO
      },
      footer: true
    });
  }

}

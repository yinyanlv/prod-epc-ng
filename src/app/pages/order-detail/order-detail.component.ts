import {Component, ViewEncapsulation, OnInit, Input} from '@angular/core';
import {OrderDetailService} from './order-detail.service';
import {GlobalConfigService} from '../../services/global-config.service';
import {SModalService} from '../../components/dialog/dialog.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-order-detail',
  templateUrl: './order-detail.html',
  styleUrls: ['./order-detail.scss']
})
export class OrderDetailComponent implements OnInit {

  // 订单详细列属性
  public columns: Array<any>;

  // 订单详细数据属性
  public list: Array<any>;

  public constructor(
    private orderDetailService: OrderDetailService,
    private gcService: GlobalConfigService,
    private dialog: SModalService
  ) {
  }

  ngOnInit() {
    this.loadOrderDetailColumns();
  }

  // 加载购物车列配置
  public loadOrderDetailColumns() {
    this.orderDetailService.getOrderDetailColumns({}, data => {
      this.columns = data;
      this.loadShoppingCartList();
    });
  }

  // 加载购物车列表
  public loadShoppingCartList() {
    this.orderDetailService.getOrderDetailList({}, data => {
      this.list = data;
    });
  }
}

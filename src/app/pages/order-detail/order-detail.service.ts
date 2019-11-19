import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs';

import {HttpClient} from '@angular/common/http';

import {BaseHttp} from '../../services/base-http.service';
import {GlobalConfigService} from '../../services/global-config.service';

@Injectable()
export class OrderDetailService extends BaseHttp {

  private orderDetailColumns: string = this.gcService.get('path') + 'order-detail-columns';

  private orderDetailList: string = this.gcService.get('path') + 'order-detail-list';

  constructor(
    public httpClient: HttpClient,
    private gcService: GlobalConfigService
  ) {
    super(httpClient);
  }

  // 获取购物车列配置信息
  public getOrderDetailColumns(params, fn): Subscription {
    let httpParams = this.gcService.getHttpParams(params);

    return this.get({
      url: this.orderDetailColumns,
      params: httpParams
    }).subscribe({
      next: fn
    });
  }

  // 获取购物车列表
  public getOrderDetailList(params, fn): Subscription {
    let httpParams = this.gcService.getHttpParams(params);

    return this.get({
      url: this.orderDetailList,
      params: httpParams
    }).subscribe({
      next: fn
    });
  }
}

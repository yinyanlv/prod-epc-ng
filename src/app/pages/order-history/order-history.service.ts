import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs';

import {HttpClient} from '@angular/common/http';

import {BaseHttp} from '../../services/base-http.service';
import {GlobalConfigService} from '../../services/global-config.service';

@Injectable()
export class OrderHistoryService extends BaseHttp {

  // 购物车列表url
  private orderHistoryList: string = this.gcService.get('path') + 'order-history';

  constructor(
    public httpClient: HttpClient,
    private gcService: GlobalConfigService
  ) {
    super(httpClient);
  }

  // 获取购物车列表
  public getOrderHistoryList(params, fn): Subscription {
    let httpParams = this.gcService.getHttpParams(params);

    return this.get({
      url: this.orderHistoryList,
      params: httpParams
    }).subscribe({
      next: fn
    });
  }

  // 删除购物车配件
  public deleteOrderHistory(params, fn) {
    let httpParams = this.gcService.getHttpParams(params);

    this.delete({
      url: httpParams,
      params: params
    }).subscribe({
      next: fn
    });
  }
}

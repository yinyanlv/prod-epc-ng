import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {BaseHttp} from '../../services/base-http.service';
import {GlobalConfigService} from '../../services/global-config.service';

@Injectable()
export class ShoppingCartService extends BaseHttp {

  // 购物车列配置信息
  private shoppingCartColumns: string = this.gcService.get('path') + 'shopping-cart-columns';

  // 购物车列表url
  private shoppingCartList: string = this.gcService.get('path') + 'shopping-cart-list';

  constructor(
    public httpClient: HttpClient,
    private gcService: GlobalConfigService
  ) {
    super(httpClient);
  }

  // 获取购物车列配置信息
  public getShoppingCartColumns(params, fn): Subscription {
    let httpParams = this.gcService.getHttpParams(params);

    return this.get({
      url: this.shoppingCartColumns,
      params: httpParams
    }).subscribe({
      next: fn
    });
  }

  // 获取购物车列表
  public getShoppingCartList(params, fn): Subscription {
    let httpParams = this.gcService.getHttpParams(params);

    return this.get({
      url: this.shoppingCartList,
      params: httpParams
    }).subscribe({
      next: fn
    });
  }

  // 删除购物车配件
  public deleteShoppingCartParts(params, fn) {
    let httpParams = this.gcService.getHttpParams(params);

    this.delete({
      url: httpParams,
      params: params
    }).subscribe({
      next: fn
    });
  }

  // 修改购物车订购数量
  public changeShoppingCartQty(params, fn) {
    let httpParams = this.gcService.getHttpParams(params);

    this.put({
      url: httpParams,
      params: params
    }).subscribe({
      next: fn
    });
  }
}

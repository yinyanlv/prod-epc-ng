import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs';

import {HttpClient} from '@angular/common/http';

import {BaseHttp} from '../../services/base-http.service';
import {GlobalConfigService} from '../../services/global-config.service';

@Injectable()
export class PartsDetailService extends BaseHttp {

  // 配件详细
  private partsDetailUrl: string = this.gcService.get('path') + 'parts-detail';

  // 配件选项卡配置与数据
  private tabConfigDataUrl: string = this.gcService.get('path') + 'tabs-data';

  constructor(
    public httpClient: HttpClient,
    private gcService: GlobalConfigService
  ) {
    super(httpClient);
  }

  // 获取配件详细信息
  public getPartsDetail(params, fn): Subscription {
    let httpParams = this.gcService.getHttpParams(params);

    return this.get({
      url: this.partsDetailUrl,
      params: httpParams
    }).subscribe({
      next: fn
    });
  }

  // 获取配件详细信息
  public getTabsConfigData(params, type, fn): Subscription {
    let httpParams = this.gcService.getHttpParams(params);

    return this.get({
      url: this.tabConfigDataUrl + '-' + type,
      params: httpParams
    }).subscribe({
      next: fn
    });
  }
}

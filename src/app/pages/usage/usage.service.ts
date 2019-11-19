import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Route, Router, ActivatedRoute, Params} from '@angular/router';

import {TreeModel} from '../../components/tree/tree.component';
import {BaseOptions} from '../../components/dialog/dialog-options.provider';

import {BaseHttp, BaseHttpOptions} from '../../services/base-http.service';
import {GlobalConfigService, URL_PARAMS_KEYS} from '../../services/global-config.service';

@Injectable()
export class UsageService extends BaseHttp {

  // 树结构url
  private treeUrl: string = this.gcService.get('path') + 'tree';

  // 缩略图例url
  private legendsUrl: string = this.gcService.get('path') + 'legend-list';

  // 图例url
  private legendUrl: string = this.gcService.get('path') + 'legend-detail';

  // 配件url
  private partsUrl: string = this.gcService.get('path') + 'parts-list';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public httpClient: HttpClient,
    private gcService: GlobalConfigService
  ) {
    super(httpClient);
  }

  // 获取树数据
  public getTree(params, fn): Subscription {
    let httpParams = this.gcService.getHttpParams(params);

    return this.get({
      url: this.treeUrl,
      params: httpParams
    }).subscribe({
      next: fn
    });
  }

  // 获取缩略图
  public getLegends(params, fn): Subscription {
    let httpParams = this.gcService.getHttpParams(params);

    return this.get({
      url: this.legendsUrl,
      params: httpParams
    }).subscribe({
      next: fn
    });
  }

  // 获取图例
  public getLegend(params, fn): Subscription {
    let httpParams = this.gcService.getHttpParams(params);

    return this.get({
      url: this.legendUrl,
      params: httpParams
    }).subscribe({
      next: fn
    });
  }

  // 获取配件
  public getParts(params, fn): Subscription {
    let httpParams = this.gcService.getHttpParams(params);

    return this.get({
      url: this.partsUrl,
      params: httpParams
    }).subscribe({
      next: fn
    });
  }

  // 重定向到一个图例
  public redirectLegend(node: TreeModel) {
    let queryParams = this.getRedirectParmas(node),
      routerParams = {queryParams: queryParams, relativeTo: this.route};

    if (node.leaf) {
      this.router.navigate(['legend/parts'], routerParams);
    } else {
      this.router.navigate(['legends'], routerParams);
    }
  }

  // 重定向到一个配件
  public redirectParts(partCode) {
    let params = this.gcService.getQueryParams();

    params[URL_PARAMS_KEYS.PARTS_CODE] = partCode;

    this.router.navigate(['legend/parts'], {queryParams: params, relativeTo: this.route});
  }

  // 获取重定向的参数
  private getRedirectParmas(node: TreeModel) {
    let idx = 1,
      params = this.gcService.getQueryParams(),
      ids = node.nodePath.split('>');

    // 删除历史参数
    Object.keys(params).forEach(key => {
      if (key.indexOf(URL_PARAMS_KEYS.PARAMS_PREFIX2) > -1) {
        delete params[key];
      }
    });

    delete params[URL_PARAMS_KEYS.PARTS_CODE];

    // 添加新的参数
    ids.forEach(id => {
      params['s_' + idx] = id;
      idx++;
    });

    return params;
  }
}

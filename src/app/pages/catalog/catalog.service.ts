import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, Subscribable} from 'rxjs/Observable';
import {
  Route,
  Router,
  ActivatedRoute,
  Params,
  CanActivate,
  Resolve,
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import {SubjectService} from '../../services/subject.service';
import {GlobalConfigService, EVENTS_MAP} from '../../services/global-config.service';
import {BaseHttp, BaseHttpOptions} from '../../services/base-http.service';
import {CatalogComponent} from './catalog.component';


@Injectable()
export class CatalogService extends BaseHttp {
  private brandUrl = this.gcService.get('path') + 'brands';

  private seriesUrl = this.gcService.get('path') + 'series';

  private featureGroupUrl = this.gcService.get('path') + 'feature-group';

  private featureSubItemsUrl = this.gcService.get('path') + 'feature-sub-items';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public httpClient: HttpClient,
    private gcService: GlobalConfigService,
    private subjectService: SubjectService
  ) {
    super(httpClient);
  }

  brands: Array<any> = [];

  // 获取品牌数据
  public getBrands(fn): Subscription {

    return this.get({
      url: this.brandUrl
    }).subscribe({next: fn});
  }

  // 获取车系数据
  public getSeries(params, fn): Subscription {
    var httpParams = this.gcService.getHttpParams(params);

    return this.get({
      params: httpParams,
      url: this.seriesUrl,
    }).subscribe({
      next: fn
    });
  }

  // 获取配置分组
  public getFeatureGroup(params, fn): Subscription {
    var httpParams = this.gcService.getHttpParams(params);

    return this.get({
      params: httpParams,
      url: this.featureGroupUrl,
    }).subscribe({
      next: fn
    });
  }

  // 获取配置分组子项目
  public getFeatureSubItems(params, fn): Subscription {
    var httpParams = this.gcService.getHttpParams(params);

    return this.get({
      params: httpParams,
      url: this.featureSubItemsUrl,
    }).subscribe({
      next: fn
    });
  }

  // 导航到车系
  public navigateToSeries(queryParams) {

    this.router.navigate(['catalog'], {queryParams: queryParams});
  }

  // 导航到配置
  public navigateToFeature(queryParams) {

    this.router.navigate(['catalog/feature'], {queryParams: queryParams});
  }

  // 导航到用法
  public navigateToUsage(queryParams) {

    this.router.navigate(['usage'], {queryParams: queryParams});
  }

  // 发布编码改变事件
  public publishCodeChange(params) {

    this.subjectService.publish(EVENTS_MAP.CATALOG.CODE_CHANGE, params);
  }
}

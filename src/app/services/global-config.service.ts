import {Injectable} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {single} from 'rxjs/operator/single';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class GlobalConfigService {

  private globalConfig: any;

  constructor(private route: ActivatedRoute) {

    this.globalConfig = window['globalConfig'];
  }

  // 设置 globalconfig 键值
  public set(key: string, value: any): void {

    this.globalConfig[key] = value;
  }

  // 获取 globalconfig 键值
  public get(key: string): any {

    return this.globalConfig[key];
  }

  // 获取 url 参数 (url/:id)
  public getParams(key: string) {

    return this.route.snapshot.paramMap.get(key);
  }

  // 获取 url 查询参数 (url?id=***)
  public getQueryParams(key?: string, isReturnObject: boolean = false) {
    let objectParams = {},
      queryParams = Object.assign({}, this.route.snapshot.queryParams);

    if (key) {
      if (queryParams[key]) {
        // 返回是一个对象
        if (isReturnObject) {
          objectParams[key] = queryParams[key];
          return objectParams;
        } else {
          return queryParams[key];
        }
      } else {
        return null;
      }
    } else {
      return queryParams;
    }
  }

  // 将 "object" 类型转换成 "HttpParams" 类型
  public getHttpParams(params): HttpParams {
    let httpParams: HttpParams = new HttpParams();

    Object.keys(params).forEach((key) => {
      httpParams = httpParams.append(key, params[key]);
    });

    return httpParams;
  }

  // 获取当前登录用户信息
  getUser() {
    let user = JSON.parse(localStorage.getItem('currentUser'));

    return user;
  }
}

// 分布订阅事件信号源
export const EVENTS_MAP = {

  // 首页 (品牌、车系、配置)
  CATALOG: {
    // 品牌改变
    BRAND_CHANGE: 'catalog:brand:change',

    // 选择编码被改变（品牌、车系、配置）
    CODE_CHANGE: 'catalog:code-change',

    // 配置阻止车系跳转
    FEATURE_PREVENT_SERIES: 'catalog:feature:prevnet-series-navigation',

    // 加载配置之前
    FEATURE_BEFORE_LOAD: 'catalog:feature:before-load',

    // 加载配置之后
    FEATURE_AFTER_LOAD: 'catalog:feature:after-load',
  },

  // 用法页（目录树、图例、配件用法）
  USAGE: {
    LEGEND_LIST_LINK: 'usage:legend-list:link'
  }
};

// URL使用参数key
export const URL_PARAMS_KEYS = {

  // 配置参数 key 前缀
  PARAMS_PREFIX1: 'm_',

  // 组与图例参数 key 前缀
  PARAMS_PREFIX2: 's_',

  // 品牌
  BRAND: 'm_1',

  // 车系
  SERIES: 'm_2',

  // 配件编码
  PARTS_CODE: 'pc',

  // 提示参数
  TIP: 't'
};

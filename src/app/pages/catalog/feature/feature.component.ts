import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {CatalogService} from './../catalog.service';
import {SubjectService} from '../../../services/subject.service';
import {GlobalConfigService, URL_PARAMS_KEYS, EVENTS_MAP} from '../../../services/global-config.service';

export interface FeatureItemModel {
  code: string;
  id: string;
  leaf: boolean;
  lvl: number;
  name: string;
  sort: number;
}

export interface FeatureModel {
  code: string;
  name: string;
  level: number,
  expand: boolean;
  acitveCode?: string;
  maxHeight: string;
  items: Array<FeatureItemModel>;
}

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-feature',
  templateUrl: './feature.html',
  styleUrls: ['./feature.scss']
})
export class FeatureComponent {

  // 加载配置层级索引
  private idx: number = 0;

  // 原始参数
  originalParams: any;

  // 配置分组数据源
  private groups: Array<FeatureModel> = [];

  constructor(
    private catalogService: CatalogService,
    private gcService: GlobalConfigService,
    private subjectService: SubjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.originalParams = Object.assign({}, this.gcService.getQueryParams());
  }

  ngOnInit() {
    let params = this.gcService.getQueryParams();

    // 当参数大于两个含有配置项目参数，则通知车系不需要跳转到配置页面，保证当前路由只加载一次
    if (Object.keys(params).length > 2) {
      this.subjectService.publish(EVENTS_MAP.CATALOG.FEATURE_PREVENT_SERIES, params);
    }

    this.route.queryParams.subscribe(params => {

      if (params[URL_PARAMS_KEYS.SERIES]) {
        if (this.idx === 0) {
          this.loadFeatureGroup();
        }
        if (this.idx > 0) {
          this.loadFeatureSubItems(Object.assign({}, params));
        }
      }
    });
  }

  // 加载配置分组
  private loadFeatureGroup() {
    let params = this.gcService.getQueryParams();

    // 当参数大于2 则重置，解决参数相同路由事件不触发
    if (Object.keys(params).length > 2) {
      this.catalogService.navigateToFeature(this.getBrandSeriesParams());
      return;
    }

    // 发布加载配置之前事件
    this.subjectService.publish(EVENTS_MAP.CATALOG.FEATURE_BEFORE_LOAD, params);

    // 加载配置组项
    this.catalogService.getFeatureGroup(params, data => {
      // 如没有配置组跳转到提示页
      if (data.length == 0) {
        this.subjectService.publish(EVENTS_MAP.CATALOG.FEATURE_AFTER_LOAD, params);
        this.navigateToTip();
        return;
      }

      this.groups = data;
      this.loadFeatureSubItems(params);
    });
  }

  // 加载配置子项目
  private loadFeatureSubItems(params) {

    this.catalogService.getFeatureSubItems(params, data => {
      let group = this.groups[this.idx],
        newParams = this.buildNewParams(group, params);

      this.setGroupValue(group, newParams, data);
      this.publishFeatureChange(group);

      this.idx++;

      if (this.idx < this.groups.length) {
        this.catalogService.navigateToFeature(newParams);
      } else {
        this.loadFeatureFinished();
      }
    });
  }

  // 加载配置完成
  private loadFeatureFinished() {
    this.idx = 0;

    // 发布加载配置之后事件
    this.subjectService.publish(EVENTS_MAP.CATALOG.FEATURE_AFTER_LOAD, null);
  }

  // 发布配置改变
  private publishFeatureChange(group) {
    let items = group.items.filter(item => item.code == group.acitveCode);
    let params = {
      key: URL_PARAMS_KEYS.PARAMS_PREFIX1 + group.level,
      name: items[0].name
    };

    this.catalogService.publishCodeChange(params);
  }

  // 构建新的参数
  private buildNewParams(group, params) {
    let curParams = this.getLevelParams(group.level);

    return Object.assign({}, params, curParams);
    ;
  }

  // 设置组的属性值
  private setGroupValue(group, newParams, data) {
    group.items = this.buildFeatureItems(data);
    group.acitveCode = newParams[URL_PARAMS_KEYS.PARAMS_PREFIX1 + group.level];
  }

  // 获取当前层级的参数, 如果当前层级参数不存在，则用-1(全部)
  private getLevelParams(level) {
    let params = {},
      key = URL_PARAMS_KEYS.PARAMS_PREFIX1 + level,
      value = this.originalParams[key];

    if (value) {
      params[key] = value;
    } else {
      params[key] = '-1';
    }

    return params;
  }

  // 配置项目添加一个全部选项
  private buildFeatureItems(items) {
    let params = {'code': '-1', 'name': '全部'};

    items.unshift(params);

    return items;
  }

  // 选择一个配置选项
  private selectFeatureItem(group: FeatureModel, item: FeatureItemModel) {

    // 如选择配置是叶子节点则跳转到用法页面
    if (item.leaf) {
      this.redirectUsage(item);
    } else { // 调用当前选中后面配置
      this.idx = group.level - 2;
      group.acitveCode = item.code;
      this.originalParams = this.getUrlParamsByLevel(group.level, item);
      this.publishFeatureChange(group);
      this.catalogService.navigateToFeature(this.originalParams);
    }
  }

  // 跳转到用法页面
  private redirectUsage(item) {
    let curParams = {},
      params = this.gcService.getQueryParams();

    curParams[URL_PARAMS_KEYS.PARAMS_PREFIX1 + item.lvl] = item.code;
    this.catalogService.navigateToUsage(Object.assign({}, params, curParams));
  }

  // 跳转到提示子页面
  private navigateToTip() {
    let tipParams = {},
      brandParams = {},
      params = this.gcService.getQueryParams();

    // 提示页根据参数加载不同提示
    tipParams[URL_PARAMS_KEYS.TIP] = 1;
    brandParams[URL_PARAMS_KEYS.BRAND] = params[URL_PARAMS_KEYS.BRAND];

    this.catalogService.publishCodeChange({});
    this.catalogService.navigateToSeries(Object.assign(brandParams, tipParams));
  }

  // 展开收起当前组
  private expandCollapseGroup(group: FeatureModel) {

    if (group.expand) {
      group.expand = false;
      group.maxHeight = '88px';
    } else {
      group.expand = true;
      group.maxHeight = '188px';
    }
  }

  // 根据层级提取url上面的参数
  private getUrlParamsByLevel(level, item) {
    let newParams = {},
      params = this.gcService.getQueryParams();

    Object.keys(params).forEach((key, idx) => {
      if (idx < level) {
        newParams[key] = params[key];
      }
    });

    newParams[URL_PARAMS_KEYS.PARAMS_PREFIX1 + level] = item.code;

    return newParams;
  }

  // 构建品牌与车系参数
  private getBrandSeriesParams() {
    let newParams = {},
      params = this.gcService.getQueryParams();

    Object.keys(params).forEach((key, idx) => {
      if (idx < 2) {
        newParams[key] = params[key];
      }
    });

    return newParams;
  }
}

import {Component, ViewEncapsulation, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {SubjectService} from '../../services/subject.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {LoadingDirective} from '../../directives/loading.directive';
import {GlobalConfigService, URL_PARAMS_KEYS, EVENTS_MAP} from '../../services/global-config.service';
import {CatalogService} from './catalog.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-catalog',
  templateUrl: './catalog.html',
  styleUrls: ['./catalog.scss']
})
export class CatalogComponent {

  // 导航显示文本
  private texts = {};

  // 导航数据源
  public crumbs: Array<object> = [];

  // loading实例
  @ViewChild('leftWrap', {read: LoadingDirective, static: false})
  public brandSeriesLoading: LoadingDirective;

  // loading实例
  @ViewChild('rightWrap', {read: LoadingDirective, static: false})
  public featureLoading: LoadingDirective;

  constructor(
    private catalogService: CatalogService,
    private gcService: GlobalConfigService,
    private router: Router,
    private route: ActivatedRoute,
    private subjectService: SubjectService
  ) {
  }

  private ngOnInit() {

    // 监听编码变化
    this.subjectService.subscribe(EVENTS_MAP.CATALOG.CODE_CHANGE, item => {
      this.texts[item.key] = item.name;
      this.bindCrumbsData(this.gcService.getQueryParams());
    });

    // 加载配置之前
    this.subjectService.subscribe(EVENTS_MAP.CATALOG.FEATURE_BEFORE_LOAD, () => {
      this.featureLoading.show();
    });

    // 加载配置之后
    this.subjectService.subscribe(EVENTS_MAP.CATALOG.FEATURE_AFTER_LOAD, () => {
      this.featureLoading.hide();
    });
  }

  // 点击导航条
  clickCrumbsItem(item) {
    let params = {};

    if (item.type == URL_PARAMS_KEYS.BRAND) {
      params[URL_PARAMS_KEYS.BRAND] = item.code;
      this.bindCrumbsData(params);
    }
  }

  // 构建导航数据
  bindCrumbsData(params) {
    let crumbs = [],
      trans = window['trans'];

    Object.keys(params).forEach((key, index) => {
      if (trans[key]) {
        crumbs.push({
          code: params[key],
          text: trans[key] + ': ' + (this.texts[key] || params[key]),
          path: this.getCrumbsPath(key),
          type: key,
          queryParams: this.getCrumbsItemParams(index)
        });
      }
    });

    this.crumbs = crumbs;
  }

  // 获取路径
  getCrumbsPath(key) {
    if (key === URL_PARAMS_KEYS.BRAND) {
      return '/catalog';
    }

    return '/catalog/feature';
  }

  // 获取参数
  getCrumbsItemParams(index) {
    let key,
      params = {},
      queryParams = this.gcService.getQueryParams();

    for (let i = 1; i <= index + 1; i++) {
      let key = URL_PARAMS_KEYS.PARAMS_PREFIX1 + i;

      params[key] = queryParams[key];
    }

    return params;
  }
}


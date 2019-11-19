import {Component, ViewEncapsulation, OnInit, EventEmitter, Output} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

// 服务
import {CatalogService} from '../catalog.service';
import {SubjectService} from '../../../services/subject.service';
import {GlobalConfigService, EVENTS_MAP, URL_PARAMS_KEYS} from '../../../services/global-config.service';

// 品牌、车系共用的数据模型
export interface SeriesModel {
  id: string;
  code: string;
  name: string;
  leaf: boolean;
  sort: number;
}

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-series',
  templateUrl: './series.html',
  styleUrls: ['./series.scss']
})
export class SeriesComponent {

  // 当前激活的车系编码
  private activeSeriesCode: any;

  // 车系数据源
  public series: Array<SeriesModel> = [];

  // 标记是否已加载数据
  private isLoaded: boolean = false;

  // 是否跳转配置
  private isNavigationt: boolean = true;

  // 数据加载之前
  @Output()
  public onBeforeLoad = new EventEmitter();

  // 数据加载之后
  @Output()
  public onAfterLoad = new EventEmitter();

  constructor(
    private catalogService: CatalogService,
    private gcService: GlobalConfigService,
    private subjectService: SubjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  private ngOnInit() {

    // 订阅大于两个参数则不跳转在配置页
    this.subjectService.subscribe(EVENTS_MAP.CATALOG.FEATURE_PREVENT_SERIES, params => {
      this.isNavigationt = false;
    });

    // 监听路由参数
    this.route.queryParams.subscribe(params => {

      // 是否有品牌参数并且是未加载过
      if (params[URL_PARAMS_KEYS.BRAND] && !this.isLoaded) {
        this.loadSeries();
      }
    });

    // 订阅品牌编码参数改变, 清除已经加载(isLoaded)属性
    this.subjectService.subscribe(EVENTS_MAP.CATALOG.BRAND_CHANGE, params => {
      this.isLoaded = false;
    });
  }

  // 加载车系
  private loadSeries() {
    let params = this.getBrandParams();

    this.isLoaded = true;
    this.onBeforeLoad.emit();

    this.catalogService.getSeries(params, data => {
      this.series = data;
      this.activeSeriesCode = this.gcService.getQueryParams(URL_PARAMS_KEYS.SERIES);
      this.onAfterLoad.emit();

      if (this.activeSeriesCode) {
        this.publicSeriesChange();
      }
      //存在激活的车系编码且可以导航
      if (this.activeSeriesCode && this.isNavigationt) {
        this.navigateToFeature();
      }
    });
  }

  // 选择车系
  public selectSeries(item) {
    this.activeSeriesCode = item.code;

    this.publicSeriesChange();
    this.navigateToFeature();
  }

  // 导航到配置页
  public navigateToFeature() {
    this.catalogService.navigateToFeature(this.getBrandSeriesParams());
  }

  // 发布车系code被改变
  public publicSeriesChange() {
    let series = this.series.filter(item => item.code == this.activeSeriesCode);

    if (series.length) {
      let params = {
        key: URL_PARAMS_KEYS.SERIES,
        name: series[0].name
      };
      this.catalogService.publishCodeChange(params);
    }
  }

  // 获取当前品牌参数
  private getBrandParams() {
    let newParams = {},
      params = this.gcService.getQueryParams();

    newParams[URL_PARAMS_KEYS.BRAND] = params[URL_PARAMS_KEYS.BRAND];

    return newParams;
  }

  // 获取当前品牌与车系参数
  private getBrandSeriesParams() {
    let newParams = {},
      params = this.gcService.getQueryParams();

    newParams[URL_PARAMS_KEYS.BRAND] = params[URL_PARAMS_KEYS.BRAND];
    newParams[URL_PARAMS_KEYS.SERIES] = this.activeSeriesCode;

    return newParams;
  }
}

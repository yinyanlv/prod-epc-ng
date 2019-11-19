import {Component, ViewEncapsulation, ViewChild, OnInit, Output, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

// 服务
import {CatalogService} from '../catalog.service';
import {SubjectService} from '../../../services/subject.service';
import {GlobalConfigService, EVENTS_MAP, URL_PARAMS_KEYS} from '../../../services/global-config.service';

// 品牌数据模型
export interface BrandModel {
  id: string;
  code: string;
  name: string;
  leaf: boolean;
  sort: number;
}

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-brand',
  templateUrl: './brand.html',
  styleUrls: ['./brand.scss']
})
export class BrandComponent {

  // 当前激活的品牌编码
  private activeBrandCode: any;

  // 品牌数据源对象
  public brands: Array<BrandModel> = [];

  // 数据加载之后
  @Output()
  public onAfterLoad = new EventEmitter();

  // 数据加载之前
  @Output()
  public onBeforeLoad = new EventEmitter();

  constructor(
    private catalogService: CatalogService,
    private gcService: GlobalConfigService,
    private subjectService: SubjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  // 组件初始化
  private ngOnInit() {

    // 改变了品牌编码发出通知
    this.route.queryParams.pairwise().subscribe(arrayParams => {

      // 两次不编码不相同则发出事件
      if (arrayParams[0][URL_PARAMS_KEYS.BRAND] != arrayParams[1][URL_PARAMS_KEYS.BRAND]) {
        this.subjectService.publish(EVENTS_MAP.CATALOG.BRAND_CHANGE, arrayParams);
      }
    });

    this.loadBrand();
  }

  // 加载品牌数据
  private loadBrand() {

    this.onBeforeLoad.emit();
    this.catalogService.getBrands(data => {
      this.brands = data;
      this.activeBrandCode = this.getActiveBrandCode();

      this.publishBrandChange();
      this.onAfterLoad.emit();

      // 如没有品牌参数，则添加默认品牌参数
      if (!this.gcService.getQueryParams(URL_PARAMS_KEYS.BRAND)) {
        this.navigateToSeries();
      }
    });
  }

  // 选择品牌项
  public selectBrand(item) {
    this.activeBrandCode = item.code;

    this.publishBrandChange();
    this.navigateToSeries();
  }

  // 导航到车系
  private navigateToSeries() {

    this.catalogService.navigateToSeries(this.getQueryParams());
  }

  // 发布品牌code被改变
  private publishBrandChange() {
    let brands = this.brands.filter(item => item.code == this.activeBrandCode);
    let params = {
      key: URL_PARAMS_KEYS.BRAND,
      name: brands[0].name
    };

    this.catalogService.publishCodeChange(params);
  }

  // 获取当前品牌参数
  private getQueryParams() {
    let params = {};

    params[URL_PARAMS_KEYS.BRAND] = this.activeBrandCode;

    return params;
  }

  // 获取品牌编码
  private getActiveBrandCode() {

    // 如果url 上面有 brand code则用， 没有取数据源第一个做为默认。
    return this.gcService.getQueryParams(URL_PARAMS_KEYS.BRAND) || this.brands[0].code;
  }
}

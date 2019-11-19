import {Component, ViewEncapsulation, OnInit, Input, ViewChild} from '@angular/core';
import {PartsDetailService} from './parts-detail.service';
import {Router, ActivatedRoute} from '@angular/router';
import {GlobalConfigService} from '../../services/global-config.service';

import {TabsComponent} from '../../components/tabs/tabs.component';
import {ImagesComponent} from '../../components/images/images.component';


// 品牌数据模型
export interface PartsFieldModel {
  name: string;
  value: string;
}

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-parts-detail',
  templateUrl: './parts-detail.html',
  styleUrls: ['./parts-detail.scss']
})
export class PartsDetailComponent implements OnInit {

  @ViewChild('tabs', {static: false})
  public tabs: TabsComponent;

  @ViewChild('img', {static: false})
  public img: ImagesComponent;

  // tab 选项卡的内部列表抬头
  public tabColumns = {};

  // tab 选项卡的内部列表数据源
  public tabList = {};

  // 面包屑显示字段
  public crumbs: Array<string> = [];

  // 配件属性
  public properties: Array<PartsFieldModel> = [];

  // 配件拍照图
  public bigPhoto: string;

  // 配件拍照图
  public thumbnail: Array<string>;

  // 配件选项配置
  public partsDetailTabsConfig = this.gcService.get('partsDetailTabsConfig');

  // 类的构造涵数
  public constructor(
    private partsDetailService: PartsDetailService,
    private gcService: GlobalConfigService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  // 组件初始化
  public ngOnInit() {
    let type = this.route.snapshot.paramMap.get('type');

    this.loadPartsDetail();
  }

  // 选项卡渲染完成，设置url参数, 激活选项卡。
  public tabAfterRender() {
    let tabCode = this.getAcitveTabCode();

    this.setNavigateUrl(tabCode);
    this.tabs.setTabActive(tabCode);
    this.loadTabGridConfigData(tabCode);
  }

  // 获取当前激活的选项卡编码
  private getAcitveTabCode() {
    let tabs,
      type = this.gcService.getQueryParams('type');

    if (type) {
      return type;
    } else {
      tabs = this.tabs.tabItems.filter(tab => tab.active == true);
      return tabs[0].item.code;
    }
  }

  // 加载配件属性信息
  public loadPartsDetail() {
    let partCode = this.route.snapshot.paramMap.get('partCode'),
      params = {partCode: partCode};

    if (partCode) {
      this.partsDetailService.getPartsDetail(params, data => {
        this.bindData(data);
      });
    }
  }

  // 绑定加载的数据
  public bindData(data) {
    this.properties = data.properties;
    this.bigPhoto = data.partPhoto.bigPhoto;
    this.thumbnail = data.partPhoto.thumbnail || [];

    if (this.thumbnail.length > 0) {
      this.bigPhoto = this.thumbnail[0];

    }
  }

  // 加载选项属性
  public selectTab(tab) {
    let code = tab.item.code;

    this.setNavigateUrl(code);
    if (!this.tabColumns[code] && !this.tabList[code]) {
      this.loadTabGridConfigData(code);
    }
  }

  // 加载选项卡内的列表配置与数据
  public loadTabGridConfigData(code) {
    let partCode = this.route.snapshot.paramMap.get('partCode'),
      params = {partCode: partCode};

    this.partsDetailService.getTabsConfigData(params, code, data => {
      this.tabColumns[code] = data.columns;
      this.tabList[code] = data.list;
    });
  }

  // 设置导航
  public setNavigateUrl(code) {
    let partCode = this.route.snapshot.paramMap.get('partCode');

    this.router.navigate(['parts-detail/' + partCode], {queryParams: {type: code}});
  }

  // 选择图片
  public selectPic(pic, event) {
    let src = 'http://localhost:3000/' + pic;

    this.bigPhoto = pic;
  }

  // 购买, 添加到购物车
  public addToCart() {
    // TODO
  }
}

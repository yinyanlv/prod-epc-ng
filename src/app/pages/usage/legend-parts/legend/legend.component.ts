import {Component, OnInit, ViewChild, ViewEncapsulation, ElementRef, HostListener, EventEmitter, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {SvgHotpointComponent} from '../../../../components/svg-hotpoint/svg-hotpoint.component';
import {LoadingDirective} from '../../../../directives/loading.directive';

// service
import {GlobalConfigService} from '../../../../services/global-config.service';
import {UsageService} from '../../usage.service';

export interface LegendModel {
  id?: string;
  code?: string;
  name?: string;
  mappingGroups?: string;
  svgFileUri?: string;
}

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-legend',
  templateUrl: './legend.html',
  styleUrls: ['./legend.scss']
})
export class LegendComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usageService: UsageService,
    private gcService: GlobalConfigService
  ) {
  }

  // svg hotpoint 图例实例
  @ViewChild('svghotpoint', {static: false})
  public svghotpoint: SvgHotpointComponent;

  // 注册点击callout事件
  @Output()
  public onClickCallout = new EventEmitter();

  // 图例加载完成事件
  @Output()
  public onLegendLoaded = new EventEmitter();

  // 图例数据
  public item: LegendModel = {};

  // 组件初始化
  ngOnInit() {
    let params = this.gcService.getQueryParams();

    this.loadLegend(params);
  }

  // 加载图例
  public loadLegend(params) {

    this.svghotpoint.showLoading();
    this.usageService.getLegend(params, data => {
      this.svghotpoint.showLoading();
      let item = data[0].struct,
        src = this.gcService.get('legendHost') + item.svgFileUri;

      this.item = item;
      this.svghotpoint.loadSVG(src);
    });
  }

  // 图例加载完成
  public legendLoaded() {
    this.onLegendLoaded.emit();
  }

  // 选择图例的callout
  public selectionCallout(callout) {
    this.onClickCallout.emit(callout);
  }
}

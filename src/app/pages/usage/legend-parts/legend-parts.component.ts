import {Component, OnInit, ViewChild, ViewEncapsulation, ElementRef, HostListener} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

// component
import {LoadingDirective} from '../../../directives/loading.directive';
import {LegendComponent} from './legend/legend.component';
import {PartsComponent} from './parts/parts.component';

// service
import {GlobalConfigService, URL_PARAMS_KEYS} from '../../../services/global-config.service';
import {UsageService} from '../usage.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-legend-parts',
  templateUrl: './legend-parts.html',
  styleUrls: ['./legend-parts.scss']
})
export class LegendPartsComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usageService: UsageService,
    private gcService: GlobalConfigService
  ) {
  }

  @ViewChild('legend', {static: false})
  private legend: LegendComponent;

  @ViewChild('parts', {static: false})
  private parts: PartsComponent;

  // 组件初始化
  private ngOnInit() {

    // 监视url参数变化加载
    this.route.queryParams.pairwise().filter(params => {
      let oldPartCode = params[0][URL_PARAMS_KEYS.PARTS_CODE];
      let newPartCode = params[1][URL_PARAMS_KEYS.PARTS_CODE];

      // 如果是选择配件行与图内序号则不加载图例与配件号
      return this.isSelectionPartsOrCallout(oldPartCode, newPartCode);

    }).subscribe(params => {
      this.legend.loadLegend(params[1]);
      this.parts.loadParts(params[1]);
    });
  }

  // 选择图例callout
  selectionLegendCallout(callout) {
    let partCode = this.parts.getPartCodeByCallout(callout);

    this.parts.highlightParts(partCode);
  }

  // 选择图例行
  selectionPartsRow(item) {
    this.legend.svghotpoint.acitveSingleCallout(item.callout);
  }

  // 加载图例完成
  legendLoaded() {
    let params = this.gcService.getQueryParams();
    let partCode = params[URL_PARAMS_KEYS.PARTS_CODE];

    if (partCode) {
      let callout = this.parts.getCalloutByPartCode(partCode);
      this.legend.svghotpoint.acitveSingleCallout(callout);
    }
  }

  // 是否选择配件与图内序号
  isSelectionPartsOrCallout(oldPartCode, newPartCode) {
    if (oldPartCode === undefined && newPartCode) {
      return false;
    }
    if (oldPartCode && newPartCode) {
      if (oldPartCode !== newPartCode) {
        return false;
      }
    }

    return true;
  }
}

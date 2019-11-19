import {Subject} from 'rxjs';
import {Observable} from 'rxjs/Observable';
import {Component, OnInit, ViewChild, ViewEncapsulation, ElementRef, HostListener, EventEmitter, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

// component
import {IconComponent} from '../../../../components/icon/icon.component';
import {LoadingDirective} from '../../../../directives/loading.directive';

// service
import {GlobalConfigService, URL_PARAMS_KEYS} from '../../../../services/global-config.service';
import {UsageService} from '../../usage.service';

export interface PartsModel {
  partId: string;
  partCode: string;
  partName: string;
  callout: string;
  qty: string;
  hand: string;
  usageNote: string;
  active: boolean;
  hover: boolean;
}

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-parts',
  templateUrl: './parts.html',
  styleUrls: ['./parts.scss']
})
export class PartsComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usageService: UsageService,
    private gcService: GlobalConfigService
  ) {
  }

  // 配件总数
  public partsCount: number = 0;

  // 配件列表数据源对象
  public items: PartsModel[];

  // 滚动条源
  private scrollToSource: Subject<number> = new Subject<number>();

  // 注册选择节点事件
  @Output()
  public onClickRow = new EventEmitter();

  // loading实例
  @ViewChild('loading', {read: LoadingDirective, static: false})
  protected loading: LoadingDirective;

  // 配件列表冻结列身体
  @ViewChild('partsLockStbody', {static: false})
  public partsLockStbody: ElementRef;

  // 配件列表浮动列身体
  @ViewChild('partsFloatTbody', {static: false})
  public partsFloatTbody: ElementRef;

  // 配件列表浮动列头
  @ViewChild('partsFloatThead', {static: false})
  public partsFloatThead: ElementRef;

  // 组件初始化
  private ngOnInit() {
    let params = this.gcService.getQueryParams();

    // 配件列表移到可见区域动画效果
    this.scrollIntoViewAnimation();
    this.loadParts(params);
  }

  // 视图渲染完成后
  private ngAfterViewInit() {
    this.listenerEvents();
  }

  // 绑定事件
  private listenerEvents() {
    let self = this;
    let partsLockStbody = this.partsLockStbody.nativeElement;
    let partsFloatThead = this.partsFloatTbody.nativeElement;
    let handlerLockedColumns = function() {
      self.lockScrollChange();
    };
    let handlerFloatColumns = function() {
      self.floatScrollChange();
    };

    // 防止scroll事件联动触发，使用动态添加scroll事件，当用使用完成后移去注册rscroll事件
    // 冻结列
    partsLockStbody.addEventListener('mouseenter', function() {
      partsLockStbody.addEventListener('scroll', handlerLockedColumns);
    });

    partsLockStbody.addEventListener('mouseleave', function() {
      partsLockStbody.removeEventListener('scroll', handlerLockedColumns);
    });

    // 浮动列
    partsFloatThead.addEventListener('mouseenter', function() {
      partsFloatThead.addEventListener('scroll', handlerFloatColumns);
    });

    partsFloatThead.addEventListener('mouseleave', function() {
      partsFloatThead.removeEventListener('scroll', handlerFloatColumns);
    });
  }

  // 加载配件
  public loadParts(params) {
    this.loading.show();

    this.usageService.getParts(params, data => {
      this.items = data;
      this.partsCount = data.length;
      this.loading.hide();
      this.highlightParts(params[URL_PARAMS_KEYS.PARTS_CODE]);
    });
  }

  // 浮动列滚动条触发
  private floatScrollChange() {
    let scrollTop = this.partsFloatTbody.nativeElement.scrollTop;
    let scrollLeft = this.partsFloatTbody.nativeElement.scrollLeft;

    this.partsLockStbody.nativeElement.scrollTop = scrollTop;
    this.partsFloatThead.nativeElement.scrollLeft = scrollLeft;
  }

  // 冻结列滚动条触发
  private lockScrollChange() {
    let scrollTop = this.partsLockStbody.nativeElement.scrollTop;

    this.partsFloatTbody.nativeElement.scrollTop = scrollTop;
  }

  // 选中行数据
  private clickRow(item) {
    this.resetItemsActive();
    item.active = true;
    this.usageService.redirectParts(item.partCode);
    this.onClickRow.emit(item);
  }

  // 重置所有行active属性
  private resetItemsActive() {
    this.items.forEach(item => item.active = false);
  }

  // 配件列表行移入
  private rowHoverIn(item) {
    item.hover = true;
  }

  // 配件列表行移出
  private rowHoverOut(item) {
    item.hover = false;
  }

  // 高亮配件
  public highlightParts(partCode) {

    if (partCode) {

      this.resetItemsActive();

      this.items.forEach(item => {
        if (item.partCode === partCode) {
          item.active = true;
        }
      });

      setTimeout(() => {
        this.rowScrollIntoView(partCode);
      }, 200);

      this.usageService.redirectParts(partCode);
    }
  }

  // 根据callout 获取partCode
  public getPartCodeByCallout(callout) {
    let node = this.items.filter(item => item.callout == callout);

    if (node.length) {
      return node[0].partCode;
    }
  }

  // 根据partCode 获取callout
  public getCalloutByPartCode(partCode) {
    let node = this.items.filter(item => item.partCode == partCode);

    if (node.length) {
      return node[0].callout;
    }
  }

  // 获取可见区域
  private getVisibleRegion(target): number {
    let targetClientRect = target.getBoundingClientRect();
    let parentClientRect = this.partsFloatTbody.nativeElement.getBoundingClientRect();

    if (parentClientRect.top > targetClientRect.top) {
      return target.offsetTop == 0 ? 1 : target.offsetTop;
    }
    if (targetClientRect.top + targetClientRect.height > parentClientRect.top + parentClientRect.height) {
      return ((parentClientRect.top + parentClientRect.height) - targetClientRect.top) - (targetClientRect.height + 17);
    }

    return 0;
  }

  // 移到可见区域
  private rowScrollIntoView(partCode) {
    let floatRow = this.partsFloatTbody.nativeElement.querySelector('[data-part-code="' + partCode + '"]');
    let lockedRow = this.partsLockStbody.nativeElement.querySelector('[data-part-code="' + partCode + '"]');

    if (floatRow && lockedRow) {
      let top = this.getVisibleRegion(floatRow);

      if (top !== 0) {
        this.scrollToSource.next(top);
      }
    }
  }

  // 实现滚动条移动到可见区域动画效果
  private scrollIntoViewAnimation() {
    this.scrollToSource.switchMap(moveScrollTop => {
      let scrollTop = this.partsFloatTbody.nativeElement.scrollTop,
        floatColumns = this.partsFloatTbody.nativeElement,
        lockedColumns = this.partsLockStbody.nativeElement;

      return Observable.interval(1)
        .scan((acc, curr) => {
          return moveScrollTop > 0 ? acc - 10 : acc + 10;
        }, this.partsFloatTbody.nativeElement.scrollTop)
        .do(scrollTop => {
          floatColumns.scrollTop = scrollTop;
          lockedColumns.scrollTop = scrollTop;
        })
        .takeWhile(val => {
          return moveScrollTop > 0 ? val > moveScrollTop : val < scrollTop + Math.abs(moveScrollTop);
        });
    }).subscribe();
  }
}

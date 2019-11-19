import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ComponentRef,
  HostListener,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ComponentFactory,
  ViewEncapsulation,
  ViewContainerRef,
  ViewChild,
  TemplateRef,
  OnDestroy
} from '@angular/core';

import {SModalSubject} from './dialog-subject-service';
import globalMonitorUtil from '../../utils/global-monitor';
import {toBoolean} from '../../utils/common';

@Component({
  encapsulation: ViewEncapsulation.None,
  viewProviders: [SModalSubject],
  selector: 's-dialog',
  templateUrl: './dialog.html',
  styleUrls: ['./dialog.scss']
})

export class DialogComponent implements AfterContentInit, AfterViewInit, OnDestroy {
  iVisible = false;
  ibodyClassMap;
  imaskClassMap;
  iwrapClassName: string;
  ianimateFadeStatus;
  iwidth = '460px';
  ititle = '';
  ititleTpl: TemplateRef<void>;
  icontent = '';
  icontentTpl: TemplateRef<void>;
  bodyStyleMap;
  istyle: object = {};
  icomponentParams: Object = {};
  bodyCmp: ComponentFactory<void>;
  iokText: string = '确定';
  icancelText: string = '取消';
  ifooterHide = false;

  footerTpl: TemplateRef<void>;
  //OK回调函数
  @Output() onCancelCallback = new EventEmitter<boolean>();
  // CANCEL回调函数
  @Output() onOkCallback = new EventEmitter<boolean>();

  @ViewChild('modalContent', {static: false}) contentEl: ElementRef;
  @ViewChild('modalComponent', {read: ViewContainerRef, static: false}) bodyEl: ViewContainerRef;

  // 隐藏页面滚动条
  @Input() isHideBodyScroll = false;

  // 居中显示
  @Input() alignCenter = true;

  // 显示boolean值
  @Input()
  set visible(value: boolean) {
    value = toBoolean(value);
    if (this.iVisible === value) {
      return;
    }
    if (value) {
      this.animateFade('enter');
      this.subject.next('onShow');
      setTimeout(() => {
        this.setStyles({
          x: globalMonitorUtil.lastClickPos.x,
          y: globalMonitorUtil.lastClickPos.y
        });
      });
    } else {
      this.animateFade('leave');
      this.subject.next('onHide');
    }

    this.iVisible = value;

    if (this.isHideBodyScroll) {
      globalMonitorUtil.setDocumentOverflowHidden(this.iVisible);
    }
  }

  get visible(): boolean {
    return this.iVisible;
  }

  // 外部包裹容器样式类
  @Input()
  set wrapClass(value: string) {
    if (value) {
      this.iwrapClassName = value;
    }
  }

  // 宽度
  @Input()
  set width(value: string | number) {
    this.iwidth = typeof value === 'number' ? value + 'px' : value;
  }

  // 内联样式
  @Input()
  set style(value: object) {
    this.istyle = value;
  }

  // 标题
  @Input()
  set title(value: string | TemplateRef<void>) {
    if (value instanceof TemplateRef) {
      this.ititleTpl = value;
    } else {
      this.ititle = value;
    }
  }

  // OK按钮文字
  @Input()
  set okText(value: string) {
    this.iokText = value;
  }

  // CANCEL按钮文字
  @Input()
  set cancelText(value: string) {
    this.icancelText = value;
  }

  // 内容(字符串/模板/外部组件)
  @Input()
  set content(value: string | TemplateRef<void> | ComponentFactory<void>) {
    if (value instanceof ComponentFactory) {
      // 如果容器对象已存在，则直接渲染，如果不存在，则设置到_bodyComponent，在ngAfterViewInit中执行
      if (this.bodyEl) {
        const cmpRef: ComponentRef<void> = this.bodyEl.createComponent(value, null, this.vcr.injector);
        Object.assign(cmpRef.instance, this.icomponentParams);
      } else {
        this.bodyCmp = value;
      }
    } else if (value instanceof TemplateRef) {
      this.icontentTpl = value;
    } else {
      this.icontent = value;
    }
  }

  // 渲染内容参数
  @Input()
  set componentParams(value: object) {
    this.icomponentParams = value;
  }

  // 页脚(是否显示/模板)
  @Input()
  set footer(value: boolean | TemplateRef<void>) {
    if (value instanceof TemplateRef) {
      this.footerTpl = value;
    } else {
      this.ifooterHide = !(!!value);
    }
  }

  @HostListener('click', ['$event']) _click(e): void {
    e.stopPropagation();
    e.preventDefault();
  }

  constructor(public subject: SModalSubject, private vcr: ViewContainerRef) {
  }

  cancel(): void {
    this.onCancelCallback.emit();
    this.subject.next('onCancel');
  }

  ok(): void {
    this.onOkCallback.emit();
    this.subject.next('onOk');
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  animateFade(status: string): void {
    this.ianimateFadeStatus = status;
    this.setMapClass();
    setTimeout(() => {
      this.ianimateFadeStatus = '';
      this.setMapClass();
    }, 200);
  }

  setMapClass(): void {
    this.imaskClassMap = {
      'a-modal-mask': true,
      'a-modal-mask-hidden': !this.iVisible && !this.ianimateFadeStatus,
      'fade-enter': this.ianimateFadeStatus === 'enter',
      'fade-enter-active': this.ianimateFadeStatus === 'enter',
      'fade-leave': this.ianimateFadeStatus === 'leave',
      'fade-leave-active': this.ianimateFadeStatus === 'leave'
    };

    this.ibodyClassMap = {
      'a-modal': true,
      'a-modal-center': this.alignCenter,
      'zoom-enter': this.ianimateFadeStatus === 'enter',
      'zoom-enter-active': this.ianimateFadeStatus === 'enter',
      'zoom-leave': this.ianimateFadeStatus === 'leave',
      'zoom-leave-active': this.ianimateFadeStatus === 'leave'
    };
  }

  setStyles(origin?: { x: number, y: number }): void {
    const el = this.contentEl.nativeElement;
    const transformOrigin = origin ? `${origin.x - el.offsetLeft}px ${origin.y - el.offsetTop}px` : '';

    this.bodyStyleMap = {
      ...{
        'width': this.iwidth,
        'transform-origin': transformOrigin
      },
      ...this.istyle
    };
  }

  ngAfterViewInit(): void {
    if (this.bodyCmp) {
      const cmpRef: ComponentRef<void> = this.bodyEl.createComponent(this.bodyCmp, null, this.vcr.injector);
      Object.assign(cmpRef.instance, this.icomponentParams);
    }
  }

  ngAfterContentInit(): void {
  }

  ngOnDestroy(): void {

    if (this.iVisible && this.isHideBodyScroll) {
      globalMonitorUtil.setDocumentOverflowHidden(false);
    }
    this.subject.next('onDestroy');
    this.subject.unsubscribe();
    this.subject = null;
  }
}

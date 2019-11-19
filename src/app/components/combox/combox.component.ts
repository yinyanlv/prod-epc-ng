import {
  forwardRef,
  AfterContentInit,
  AfterContentChecked,
  TemplateRef,
  OnInit,
  Component,
  HostListener,
  Input,
  Output,
  EventEmitter,
  Renderer2,
  ViewEncapsulation,
  ViewChild,
  ElementRef
} from '@angular/core';
import {CdkConnectedOverlay} from '@angular/cdk/overlay';
// 可用作自定义组件作数据双向绑定
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ComboxOptionComponent} from './combox.option.component';
import {toBoolean} from '../../utils/common';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 's-combox',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ComboxComponent),
    multi: true
  }],
  templateUrl: './combox.html',
  styleUrls: ['./combox.scss']
})

export class ComboxComponent implements OnInit, AfterContentInit, AfterContentChecked, ControlValueAccessor {

  // 下拉框项
  optionComponent: ComboxOptionComponent;
  // 源数据
  options: ComboxOptionComponent[] = [];
  // 经源数据过滤数据
  filterOptions: ComboxOptionComponent[] = [];
  // 选中项
  selectedOption: ComboxOptionComponent;
  // 箭头图标替换模板
  arrowIpl: TemplateRef<void>;
  el: HTMLElement;
  wrapClassList: string[] = [];
  isOpen = false;
  idisabled = false;
  triggerWidth = 0;
  prefixCls = 's-select';
  ishowSearch = false;
  searchText = '';

  // ngModel access
  onChange: (value: string | string[]) => void = () => null;
  onTouched: () => void = () => null;

  @ViewChild(CdkConnectedOverlay, {static: false}) _overlay: CdkConnectedOverlay;
  @ViewChild('trigger', {static: false}) trigger: ElementRef;
  @ViewChild('searchInput', {static: false}) searchInputElementRef: ElementRef;

  @Output() nsSearchChange: EventEmitter<string> = new EventEmitter();

  @Input()
  set arrowIconTef(template: TemplateRef<void>) {

    if (template instanceof TemplateRef) {
      this.arrowIpl = template;
    }
  }

  // 默认本地筛选数据
  @Input() nsFilter = true;

  // 设置显示样式
  @Input()
  set bodyClass(cls: string) {
    const el = this.trigger.nativeElement;
    if (cls) {
      const list = cls.split(' ');
      list.forEach(item => this.renderer2.addClass(el, item));
    }
  }

  @Input()
  set open(value: boolean) {
    value = toBoolean(value);

    if (value === this.isOpen) {
      return;
    }
    if (value) {
      this.setTriggerWidth();
    }
    this.isOpen = value;
  }

  get open(): boolean {
    return this.isOpen;
  }

  @Input()
  set disabled(value: boolean) {
    value = toBoolean(value);

    if (value === this.idisabled) {
      return;
    }
    if (value) {
      this.setClassMap();
    }
    this.idisabled = value;
  }

  // 是否提供搜索
  @Input()
  set nsShowSearch(value: boolean) {
    this.ishowSearch = toBoolean(value);
  }

  get nsShowSearch(): boolean {
    return this.ishowSearch;
  }

  constructor(private renderer2: Renderer2, private elRef: ElementRef) {
    this.el = this.elRef.nativeElement;
  }

  // 控件单击事件
  @HostListener('click', ['$event']) onclick(e: MouseEvent): void {
    e.preventDefault();

    if (!this.idisabled) {
      this.open = !this.open;
      if (this.nsShowSearch) {
        this.triggerSearch();
        setTimeout(() => {
          this.searchInputElementRef.nativeElement.focus();
        });
      }
    }
  }

  // 暂未实现
  setTriggerWidth(): void {
    this.triggerWidth = this.getTriggerWidth().width;
    if (this._overlay && this._overlay.overlayRef) {
      // this._overlay.overlayRef.updateSize({
      //     width:this.triggerWidth
      // });
    }
  }

  // 暂未实现
  getTriggerWidth(): ClientRect {
    return this.trigger.nativeElement.getBoundingClientRect();
  }

  // 关闭下拉
  closeDropDown(): void {
    if (!this.open) {
      return;
    }

    if (this.nsShowSearch) {
      if (!this.selectedOption || this.selectedOption.sName !== this.searchText) {
        this.selectedOption = {
          sValue: this.searchText,
          sName: this.searchText,
          ivalue: this.searchText,
          iname: this.searchText,
        } as any as ComboxOptionComponent;
      }
    }

    this.open = false;
  }

  // 根据不同状态设置样式类,待后期扩展
  setClassMap(): void {
    this.wrapClassList.forEach(clsName => {
      this.renderer2.removeClass(this.el, clsName);
    });
    this.wrapClassList = [
      this.prefixCls,
      this.isOpen && `${this.prefixCls}-open`,
      this.idisabled && `${this.prefixCls}-disabled`
    ].filter((item) => {
      return !!item;
    });
    this.wrapClassList.forEach(clsName => {
      this.renderer2.addClass(this.el, clsName);
    });
  }

  // 点击下拉项
  clickOption(option: ComboxOptionComponent, event: MouseEvent): void {
    if (!option) {
      return;
    }

    this.chooseOption(option, true, event);
    this.open = false;
  }

  chooseOption(option: ComboxOptionComponent, isuserClick: boolean = false, $event?: MouseEvent): void {
    if ($event) {
      $event.preventDefault();
      $event.stopPropagation();
    }

    this.selectedOption = option;
    if (isuserClick) {
      this.onChange(option.sValue);
    }
  }

  // 双向绑定模式,数据发生变化时触发
  updateSelectedOption(currentModelValue: string | string[], triggerByNgModel: boolean = false): void {
    if (currentModelValue == null) {
      return;
    }

    const selectedOption = this.options.filter(item => {
      return (item != null) && (item.sValue == currentModelValue);
    });
    this.chooseOption(selectedOption[0], false);
  }

  // 添加数据项
  addOption(option: ComboxOptionComponent) {
    this.options.push(option);
  }

  // 移除数据项
  removeOption(option: ComboxOptionComponent) {
    this.options.splice(this.options.indexOf(option), 1);
  }

  // 下拉框打开时选中项值赋与搜索文框并更新数据源
  triggerSearch(): void {
    this.searchText = this.selectedOption && this.selectedOption.sName;

    this.updateFilterOption();
  }

  updateFilterOption() {
    if (this.nsFilter) {
      if (this.searchText) {
        const options = this.options.filter(option => (option.sName) && (option.sName.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1));

        // 若没有匹配项以下代码可自定义显示项
        // if (!options.length) {
        //     const notFoundText = "Not Found";
        //     options = [{
        //         sValue: notFoundText,
        //         sName: notFoundText,
        //         ivalue: notFoundText,
        //         iname: notFoundText,
        //     } as any as ComboxOptionComponent];
        // }

        this.filterOptions = options;

      } else {
        this.filterOptions = this.options;
      }
    } else {
      this.filterOptions = this.options;
    }
  }

  onSearchChange(searchValue: string): void {
    this.nsSearchChange.emit(searchValue);
  }

  // 实现  ControlValueAccessor接口方法(注册ngModel值改变时传的方法)
  registerOnChange(fn: (value: string | string[]) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(value: string | string[]): void {
    // TODO
    // 只有首次初始化时可以调用???
    if (!value) {
      return;
    }
    this.updateSelectedOption(value);

  }

  ngOnInit(): void {
    this.updateFilterOption();
    this.setClassMap();
  }

  ngAfterContentInit() {
  }

  ngAfterContentChecked() {
  }
}

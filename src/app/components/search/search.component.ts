import {Component, OnInit, OnChanges, ViewEncapsulation, Input, Output, EventEmitter, SimpleChanges} from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 's-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnChanges, OnInit {

  private isShowOptions: boolean;
  private isShowOptionsBtn: boolean;
  private searchText = '';
  private isClear: boolean;

  @Input()
  searchOptions: Array<{}>;

  // 获取历史或者输入查询记录
  @Output()
  getSearchData = new EventEmitter();

  // 删除某一条历史查询记录
  @Output()
  deleteSearchOption: EventEmitter<string> = new EventEmitter<string>();

  // 注册查询事件
  @Output()
  doSearch: EventEmitter<string> = new EventEmitter<string>();

  // 清除全部查询历史
  @Output()
  clearSearchHistory = new EventEmitter();

  // 获取焦点时搜索框无值和有值分别获取对应options
  getHistoryOptions() {
    if (this.searchText) {
      this.onSearchChange(this.searchText);
      return;
    }

    this.isClear = true;
    this.getSearchData.emit();
    this.isShowOptionsBtn = true;
  }

  // 输入值变化时获取对应的options
  onSearchChange(searchVal: string) {
    if (!searchVal) {
      this.getHistoryOptions();
      return;
    }

    this.isClear = false;
    this.getSearchData.emit(searchVal);
    this.isShowOptionsBtn = false;
  }

  // 关闭下拉数据
  closeSearchOptions(): void {
    this.isShowOptions = false;
  }

  // 选择下拉数据
  selectOption(selectOption: string): void {
    this.searchText = selectOption;
    this.closeSearchOptions();
    this.search(selectOption);
  }

  // 删除对应的下拉历史数据
  deleteClickData(deleteData): void {
    this.deleteSearchOption.emit(deleteData);
    this.getHistoryOptions();
  }

  // 查找
  search(val: string): void {
    if (!val) {
      return;
    }
    this.doSearch.emit(val);
  }

  // 清空所有查询记录
  doClear() {
    this.clearSearchHistory.emit();
  }

  ngOnInit(): void {
    this.isShowOptions = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.searchOptions.currentValue && changes.searchOptions.currentValue.length !== 0) {
      this.isShowOptions = true;
    } else {
      this.isShowOptions = false;
    }
  }
}

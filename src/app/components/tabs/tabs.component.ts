import {Component, Output, EventEmitter, OnInit, AfterContentInit, ContentChildren, QueryList} from '@angular/core';
import {TabItemComponent} from './tab-item/tab-item.component';

@Component({
  selector: 's-tabs',
  templateUrl: './tabs.html',
  styleUrls: ['./tabs.scss'],
})
export class TabsComponent implements AfterContentInit {

  @Output()
  public onAfterReader = new EventEmitter();

  @Output()
  public tabItemClick = new EventEmitter();

  @ContentChildren(TabItemComponent)
  public tabItems: QueryList<TabItemComponent>;

  public ngAfterContentInit() {
    if (this.tabItems.length > 0) {

      // 默认选中第一个
      const tabs = this.tabItems.filter(item => item.active === true);

      if (tabs.length === 0) {
        setTimeout(() => {
          this.tabItems.first.active = true;
        }, 0);
      }

      setTimeout(() => {
        this.onAfterReader.emit();
      }, 0);
    }
  }

  public selectTab(tab, item) {
    this.resetTabActive();

    tab.active = true;
    this.tabItemClick.emit(tab);
  }

  public setTabActive(code) {
    const tabs = this.tabItems.filter(tab => tab.item.code == code);

    this.resetTabActive();

    if (tabs.length > 0) {
      tabs[0].active = true;
    }
  }

  private resetTabActive() {

    this.tabItems.forEach(tab => tab.active = false);
  }
}

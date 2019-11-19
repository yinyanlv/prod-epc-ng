import {EventEmitter, OnDestroy} from '@angular/core';

export interface Position {
  x: number;
  y: number;
}

export class GlobalMonitorUtil implements OnDestroy {
  counter = 0;
  lastClickPos: Position = {
    x: 0,
    y: 0
  };

  navItemSource: EventEmitter<any> = new EventEmitter();

  setDocumentOverflowHidden(status: boolean): void {
    document.body.style.overflow = status ? 'hidden' : '';
  }

  observeGlobalEvents(): void {
    // 监听document的点击事件,记录点击坐标,并抛出documentClick事件
    document.addEventListener('click', (e) => {
      this.lastClickPos = {
        x: e.clientX,
        y: e.clientY
      };

      this.navItemSource.emit({type: 'documentClick', e: e});
    });
  }

  constructor() {
    this.observeGlobalEvents();
  }

  ngOnDestroy(): void {
  }
}

export default new GlobalMonitorUtil();

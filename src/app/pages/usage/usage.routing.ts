import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {UsageComponent} from './usage.component';
import {LegendListComponent} from './legend-list/legend-list.component';
import {LegendPartsComponent} from './legend-parts/legend-parts.component';
import {NavigationTipComponent} from './navigation-tip/navigation-tip.component';

const routes: Routes = [{
  path: '',
  component: UsageComponent,
  children: [{
    // 导航提示
    path: '',
    component: NavigationTipComponent
  }, {
    // 右边缩略图
    path: 'legends',
    component: LegendListComponent
  }, {
    // 左图右数据
    path: 'legend/parts',
    component: LegendPartsComponent
  }]
}];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

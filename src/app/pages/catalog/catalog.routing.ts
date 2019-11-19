import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule, UrlSegment} from '@angular/router';

import {CatalogComponent} from './catalog.component';
import {FeatureComponent} from './feature/feature.component';
import {NavigationTipComponent} from './navigation-tip/navigation-tip.component';
import {CatalogService} from './catalog.service';

const routes: Routes = [{
  path: '',
  component: CatalogComponent,
  children: [{
    // 导航提示
    path: '',
    component: NavigationTipComponent
  }, {
    // 右边缩略图
    path: 'feature',
    component: FeatureComponent
  }]
}];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

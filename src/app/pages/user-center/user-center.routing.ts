import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule, UrlSegment} from '@angular/router';

import {UserCenterComponent} from './user-center.component';
import {DealerInfoComponent} from './dealer-info/dealer-info.component';
import {SubAccountComponent} from './sub-account/sub-account.component';
import {AccountComponent} from './account/account.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {SystemInfoComponent} from './system-info/system-info.component';

const routes: Routes = [{
  path: '',
  component: UserCenterComponent,
  children: [{
    // 服务站信息(默认)
    path: '',
    component: DealerInfoComponent
  }, {
    // 服务站信息
    path: 'dealer-info',
    component: DealerInfoComponent
  }, {
    // 子账号管理
    path: 'sub-account',
    component: SubAccountComponent
  }, {
    // 账号管理
    path: 'account',
    component: AccountComponent
  }, {
    // 密码修改
    path: 'change-password',
    component: ChangePasswordComponent
  }, {
    // 系统信息
    path: 'system-info',
    component: SystemInfoComponent
  }]
}];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

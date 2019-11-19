import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {ErrorComponent} from './pages/error/error.component';
import {MasterLayoutComponent} from './layouts/master-layout/master-layout.component';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [{
  path: '',
  redirectTo: 'catalog',
  pathMatch: 'full'
}, {
  // 登录
  path: 'login',
  component: LoginComponent
}, {
  path: '',
  component: MasterLayoutComponent,
  // canActivate: [AuthGuard],
  children: [{
    path: 'static-catalog',
    loadChildren: () => import('./pages/static/catalog/catalog.module').then(m => m.CatalogModule),
  }, {
    path: 'static-usage',
    loadChildren: () => import('./pages/static/usage/usage.module').then(m => m.UsageModule)

  }]
}, {
  // 首页页面
  path: 'catalog',
  loadChildren: () => import('./pages/catalog/catalog.module').then(m => m.CatalogModule),
  // canActivate: [AuthGuard]
}, {
  // 用法(左图右数据)
  path: 'usage',
  loadChildren: () => import('./pages/usage/usage.module').then(m => m.UsageModule),
  canActivate: [AuthGuard]
}, {
  // 配件详细
  path: 'parts-detail/:partCode',
  loadChildren: () => import('./pages/parts-detail/parts-detail.module').then(m => m.PartsDetailModule),
  canActivate: [AuthGuard]
}, {
  // 购物车
  path: 'shopping-cart',
  loadChildren: () => import('./pages/shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule),
  canActivate: [AuthGuard]
}, {
  // 订单历史
  path: 'order-history',
  loadChildren: () => import('./pages/order-history/order-history.module').then(m => m.OrderHistoryModule),
  canActivate: [AuthGuard]
}, {
  // 订单详细
  path: 'order-detail/:orderCode',
  loadChildren: () => import('./pages/order-detail/order-detail.module').then(m => m.OrderDetailModule),
  canActivate: [AuthGuard]
}, {
  // 用户中心
  path: 'user-center',
  loadChildren: () => import('./pages/user-center/user-center.module').then(m => m.UserCenterModule),
  canActivate: [AuthGuard]
}, {
  path: '**',
  component: ErrorComponent
}];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  useHash: false
});

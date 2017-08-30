import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ErrorComponent} from './pages/error/error.component';

const routes:Routes = [{
    path: '',
    redirectTo: 'catalog',
    pathMatch: 'full'
}, {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginModule'
}, {
    path: 'catalog',
    loadChildren: './pages/catalog/catalog.module#CatalogModule'
}, {
    path: 'usage',
    loadChildren: './pages/usage/usage.module#UsageModule'
}, {
    path: 'part',
    loadChildren: './pages/part-detail/part-detail.module#PartDetailModule'
}, {
    path: 'cart',
    loadChildren: './pages/shopping-cart/shopping-cart.module#ShoppingCartModule'
}, {
    path: 'purchase-history',
    loadChildren: './pages/purchase-history/purchase-history.module#PurchaseHistoryModule'
}, {
    path: 'order-history',
    loadChildren: './pages/order-history/order-history.module#OrderHistoryModule'
}, {
    path: 'search',
    loadChildren: './pages/search/search.module#SearchModule'
}, {
    path: '**',
    component: ErrorComponent
}];

export const AppRouting:ModuleWithProviders = RouterModule.forRoot(routes, {
    useHash: false
});

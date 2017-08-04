import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PurchaseHistoryComponent} from './purchase-history.component';

const routes: Routes = [{
  path: '',
  component: PurchaseHistoryComponent
}];

export const PurchaseHistoryRouting: ModuleWithProviders = RouterModule.forChild(routes);

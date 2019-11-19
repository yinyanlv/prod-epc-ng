import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {OrderDetailComponent} from './order-detail.component';

const routes: Routes = [{
  path: '',
  component: OrderDetailComponent
}];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

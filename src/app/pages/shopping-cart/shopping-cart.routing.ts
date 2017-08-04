import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ShoppingCartComponent} from './shopping-cart.component';

const routes: Routes = [{
  path: '',
  component: ShoppingCartComponent
}];

export const ShoppingCartRouting: ModuleWithProviders = RouterModule.forChild(routes);

import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SearchComponent} from './search.component';

const routes: Routes = [{
  path: '',
  component: SearchComponent
}];

export const SearchRouting: ModuleWithProviders = RouterModule.forChild(routes);

import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PartsDetailComponent} from './parts-detail.component';

const routes: Routes = [{
  path: '',
  component: PartsDetailComponent
}];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

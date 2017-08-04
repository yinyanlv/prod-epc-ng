import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PartDetailComponent} from './part-detail.component';

const routes: Routes = [{
  path: '',
  component: PartDetailComponent
}];

export const PartDetailRouting: ModuleWithProviders = RouterModule.forChild(routes);

import {NgModule} from '@angular/core';

import {SectionModule} from './section.module';
import {MasterLayoutComponent} from '../layouts/master-layout/master-layout.component';

const components = [
  MasterLayoutComponent
];

@NgModule({
  imports: [
    SectionModule,
  ],
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ]
})

export class LayoutModule {
}

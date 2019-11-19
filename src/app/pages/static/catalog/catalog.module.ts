import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SectionModule} from '../../../modules/section.module';
import {CatalogComponent} from './catalog.component';

import {routing} from './catalog.routing';

@NgModule({
  imports: [
    CommonModule,
    SectionModule,
    routing
  ],
  declarations: [
    CatalogComponent
  ],
  providers: []
})
export class CatalogModule {
}

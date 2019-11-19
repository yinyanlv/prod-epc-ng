import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ComponentModule} from '../../modules/component.module';
import {SectionModule} from '../../modules/section.module';

import {CatalogService} from './catalog.service';
import {routing} from './catalog.routing';

import {CatalogComponent} from './catalog.component';
import {BrandComponent} from './brand/brand.component';
import {SeriesComponent} from './series/series.component';
import {FeatureComponent} from './feature/feature.component';
import {NavigationTipComponent} from './navigation-tip/navigation-tip.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentModule,
    SectionModule,
    routing
  ],
  declarations: [
    CatalogComponent,
    BrandComponent,
    SeriesComponent,
    NavigationTipComponent,
    FeatureComponent
  ],
  providers: [CatalogService],
  exports: []
})
export class CatalogModule {
}

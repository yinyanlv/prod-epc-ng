import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ComponentModule} from '../../modules/component.module';
import {SectionModule} from '../../modules/section.module';

import {UsageComponent} from './usage.component';
import {NavigationTipComponent} from './navigation-tip/navigation-tip.component';
import {LegendListComponent} from './legend-list/legend-list.component';
import {LegendPartsComponent} from './legend-parts/legend-parts.component';
import {SvgDragZoomComponent} from '../../components/svg-drag-zoom/svg-drag-zoom.component';
import {SvgHotpointComponent} from '../../components/svg-hotpoint/svg-hotpoint.component';
import {PartsComponent} from './legend-parts/parts/parts.component';
import {LegendComponent} from './legend-parts/legend/legend.component';
import {TreeCatalogComponent} from './tree-catalog/tree-catalog.component';

import {routing} from './usage.routing';

@NgModule({
  imports: [
    ComponentModule,
    SectionModule,
    CommonModule,
    routing
  ],
  declarations: [
    UsageComponent,
    SvgDragZoomComponent,
    SvgHotpointComponent,
    LegendPartsComponent,
    NavigationTipComponent,
    LegendListComponent,
    LegendComponent,
    PartsComponent,
    TreeCatalogComponent
  ]
})
export class UsageModule {
}

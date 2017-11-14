import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {SharedComponentsModule} from '../../modules/shared-components.module';
import {CatalogComponent} from './catalog.component';
import {CatalogService} from './catalog.service';
import {CatalogRouting} from './catalog.routing';
import {BrandSeriesComponent} from './brand-series/brand-series.component';
import {SearchConditionComponent} from './search-condition/search-condition.component';
import {ConditionComponent} from './condition/condition.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedComponentsModule,
        CatalogRouting
    ],
    declarations: [
        CatalogComponent,
        BrandSeriesComponent,
        SearchConditionComponent,
        ConditionComponent
    ],
    providers: [CatalogService]
})
export class CatalogModule {
}

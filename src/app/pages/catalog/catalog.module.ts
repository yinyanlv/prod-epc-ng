import {NgModule} from '@angular/core';

import {SharedModule} from '../../modules/shared.module';
import {CatalogComponent} from './catalog.component';
import {CatalogService} from './catalog.service';
import {CatalogRouting} from './catalog.routing';
import {BrandSeriesComponent} from './brand-series/brand-series.component';
import {SearchConditionComponent} from './search-condition/search-condition.component';
import {ConditionComponent} from './condition/condition.component';

import {ParentComponent} from './parent.component';
import {ChildAComponent} from './child-a.component';
import {ChildBComponent} from './child-b.component';

@NgModule({
    imports: [
        SharedModule,
        CatalogRouting
    ],
    declarations: [
        CatalogComponent,
        BrandSeriesComponent,
        SearchConditionComponent,
        ConditionComponent,
        ParentComponent,
        ChildAComponent,
        ChildBComponent
    ],
    providers: [CatalogService]
})
export class CatalogModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedComponentsModule} from '../../modules/shared-components.module';
import {CatalogComponent} from './catalog.component';
import {CatalogService} from './catalog.service';
import {CatalogRouting} from './catalog.routing';

@NgModule({
    imports: [
        CommonModule,
        SharedComponentsModule,
        CatalogRouting
    ],
    declarations: [
        CatalogComponent
    ],
    providers: [CatalogService]
})
export class CatalogModule {
}

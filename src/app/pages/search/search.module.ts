import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedComponentsModule} from '../../modules/shared-components.module';
import {SearchComponent} from './search.component';
import {SearchRouting} from './search.routing';

@NgModule({
    imports: [
        CommonModule,
        SharedComponentsModule,
        SearchRouting
    ],
    declarations: [
        SearchComponent
    ]
})
export class SearchModule {
}

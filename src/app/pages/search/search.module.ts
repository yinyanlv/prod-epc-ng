import {NgModule} from '@angular/core';

import {SharedModule} from '../../modules/shared.module';
import {SearchComponent} from './search.component';
import {SearchRouting} from './search.routing';

@NgModule({
    imports: [
        SharedModule,
        SearchRouting
    ],
    declarations: [
        SearchComponent
    ]
})
export class SearchModule {
}

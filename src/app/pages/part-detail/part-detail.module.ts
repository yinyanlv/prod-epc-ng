import {NgModule} from '@angular/core';

import {SharedModule} from '../../modules/shared.module';
import {PartDetailComponent} from './part-detail.component';
import {PartDetailRouting} from './part-detail.routing';

@NgModule({
    imports: [
        SharedModule,
        PartDetailRouting
    ],
    declarations: [
        PartDetailComponent
    ]
})
export class PartDetailModule {
}

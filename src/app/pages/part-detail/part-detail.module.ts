import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedComponentsModule} from '../../modules/shared-components.module';
import {PartDetailComponent} from './part-detail.component';
import {PartDetailRouting} from './part-detail.routing';

@NgModule({
    imports: [
        CommonModule,
        SharedComponentsModule,
        PartDetailRouting
    ],
    declarations: [
        PartDetailComponent
    ]
})
export class PartDetailModule {
}

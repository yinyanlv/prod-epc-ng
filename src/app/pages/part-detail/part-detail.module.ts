import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PartDetailComponent} from './part-detail.component';
import {PartDetailRouting} from './part-detail.routing';

@NgModule({
    imports: [
        CommonModule,
        PartDetailRouting
    ],
    declarations: [
        PartDetailComponent
    ]
})
export class PartDetailModule {
}

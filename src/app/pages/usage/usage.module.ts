import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LegendComponent} from './legend/legend.component';
import {UsageComponent} from './usage.component';
import {UsageRouting} from './usage.routing';

@NgModule({
    imports: [
        CommonModule,
        UsageRouting
    ],
    declarations: [
        LegendComponent,
        UsageComponent
    ]
})
export class UsageModule {
}

import {NgModule} from '@angular/core';

import {SharedModule} from '../../modules/shared.module';
import {LegendComponent} from './legend/legend.component';
import {UsageComponent} from './usage.component';
import {UsageRouting} from './usage.routing';
import {TreeComponent} from './tree/tree.component';

@NgModule({
    imports: [
        SharedModule,
        UsageRouting
    ],
    declarations: [
        LegendComponent,
        UsageComponent,
        TreeComponent
    ]
})
export class UsageModule {
}

import {NgModule} from '@angular/core';

import {SharedModule} from '../../modules/shared.module';
import {OrderHistoryComponent} from './order-history.component';
import {OrderHistoryRouting} from './order-history.routing';

@NgModule({
    imports: [
        SharedModule,
        OrderHistoryRouting
    ],
    declarations: [
        OrderHistoryComponent
    ]
})
export class OrderHistoryModule {
}

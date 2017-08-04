import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrderHistoryComponent} from './order-history.component';
import {OrderHistoryRouting} from './order-history.routing';

@NgModule({
    imports: [
        CommonModule,
        OrderHistoryRouting
    ],
    declarations: [
        OrderHistoryComponent
    ]
})
export class OrderHistoryModule {
}

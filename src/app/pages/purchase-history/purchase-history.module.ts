import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PurchaseHistoryComponent} from './purchase-history.component';
import {PurchaseHistoryRouting} from './purchase-history.routing';

@NgModule({
    imports: [
        CommonModule,
        PurchaseHistoryRouting
    ],
    declarations: [
        PurchaseHistoryComponent
    ]
})
export class PurchaseHistoryModule {
}

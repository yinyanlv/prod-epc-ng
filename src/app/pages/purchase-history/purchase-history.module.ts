import {NgModule} from '@angular/core';

import {SharedModule} from '../../modules/shared.module';
import {PurchaseHistoryComponent} from './purchase-history.component';
import {PurchaseHistoryRouting} from './purchase-history.routing';

@NgModule({
    imports: [
        SharedModule,
        PurchaseHistoryRouting
    ],
    declarations: [
        PurchaseHistoryComponent
    ]
})
export class PurchaseHistoryModule {
}

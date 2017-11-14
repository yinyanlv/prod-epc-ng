import {NgModule} from '@angular/core';

import {SharedModule} from '../../modules/shared.module';
import {ShoppingCartComponent} from './shopping-cart.component';
import {ShoppingCartRouting} from './shopping-cart.routing';

@NgModule({
    imports: [
        SharedModule,
        ShoppingCartRouting
    ],
    declarations: [
        ShoppingCartComponent
    ]
})
export class ShoppingCartModule {
}

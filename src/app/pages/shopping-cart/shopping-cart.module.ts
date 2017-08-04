import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShoppingCartComponent} from './shopping-cart.component';
import {ShoppingCartRouting} from './shopping-cart.routing';

@NgModule({
    imports: [
        CommonModule,
        ShoppingCartRouting
    ],
    declarations: [
        ShoppingCartComponent
    ]
})
export class ShoppingCartModule {
}

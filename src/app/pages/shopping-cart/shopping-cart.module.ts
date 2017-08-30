import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedComponentsModule} from '../../modules/shared-components.module';
import {ShoppingCartComponent} from './shopping-cart.component';
import {ShoppingCartRouting} from './shopping-cart.routing';

@NgModule({
    imports: [
        CommonModule,
        SharedComponentsModule,
        ShoppingCartRouting
    ],
    declarations: [
        ShoppingCartComponent
    ]
})
export class ShoppingCartModule {
}

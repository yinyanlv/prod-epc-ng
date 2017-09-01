import {Component, OnInit, ViewEncapsulation} from "@angular/core";

import {CartService} from './cart.service';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'header-cart',
    templateUrl: './cart.html',
    styleUrls: ['./cart.scss'],
    providers: [CartService]
})
export class CartComponent implements OnInit {

    orders: Array<any> = [];

    constructor(
        private cartService: CartService
    ) {
    }

    ngOnInit() {

        this.orders = this.cartService.getOrders();
    }

    deleteOrder(orderId: string | number) {

        this.cartService.deleteOrder(orderId);
    }
}

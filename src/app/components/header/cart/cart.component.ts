import {Component, OnInit, ViewEncapsulation} from "@angular/core";

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'header-cart',
    templateUrl: './cart.html',
    styleUrls: ['./cart.scss']
})
export class CartComponent implements OnInit {

    ngOnInit() {

    }
}

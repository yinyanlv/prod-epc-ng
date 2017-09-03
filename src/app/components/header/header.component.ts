import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import {BaseComponent} from '../../base/base-component';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-header',
    templateUrl: './header.html',
    styleUrls: ['./header.scss'],
})
export class HeaderComponent extends BaseComponent implements OnInit {

    ngOnInit() {
    }
}

import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {BaseComponent} from '../../base/base-component';
import {CatalogService} from './catalog.service';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-catalog',
    templateUrl: './catalog.html',
    styleUrls: ['./catalog.scss']
})
export class CatalogComponent extends BaseComponent implements OnInit {

    constructor(
        private router: Router
    ) {
        super();
    }

    ngOnInit() {
    }
}

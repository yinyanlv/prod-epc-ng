import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {TransService} from '../../services/trans.service';
import {GlobalConfigService} from '../../services/global-config.service';
import {CatalogService} from './catalog.service';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-catalog',
    templateUrl: './catalog.html',
    styleUrls: ['./catalog.scss']
})
export class CatalogComponent implements OnInit {

    constructor(
        private router: Router
    ) {
    }

    ngOnInit() {

    }
}

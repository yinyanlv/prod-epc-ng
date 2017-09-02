import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import {CrumbService} from './crumb.service';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-crumb',
    templateUrl: './crumb.html',
    styleUrls: ['./crumb.scss'],
    providers: [CrumbService]
})
export class CrumbComponent implements OnInit {

    crumbs: Array<any>;

    constructor(
        private crumbService: CrumbService
    ) {
    }

    ngOnInit() {

        this.crumbs = this.crumbService.getCrumbs();
    }
}

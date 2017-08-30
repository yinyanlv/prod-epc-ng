import {Component, OnInit, Inject, ViewEncapsulation} from '@angular/core';

import {GlobalConfigService} from '../../services/global-config.service';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-header',
    templateUrl: './header.html',
    styleUrls: ['./header.scss'],
})
export class HeaderComponent implements OnInit {

    constructor(
        @Inject(GlobalConfigService) public globalConfig
    ) {
    }

    ngOnInit() {
    }
}

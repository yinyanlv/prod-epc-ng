import {Component, ViewEncapsulation, OnInit} from '@angular/core';

import {BaseComponent} from './base/base-component';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-root',
    templateUrl: './app.html',
    styleUrls: ['./app.scss']
})
export class AppComponent extends BaseComponent implements OnInit {

    ngOnInit() {

        this.stateService.setLanguage(this.globalConfig.lang);
    }
}

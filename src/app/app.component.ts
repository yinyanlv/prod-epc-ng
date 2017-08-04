import {Component, Inject} from '@angular/core';

import {GlobalConfigService} from './services/global-config.service';
import {StateService} from './services/state.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.html',
    styleUrls: ['./app.scss']
})
export class AppComponent {

    constructor(
        @Inject(GlobalConfigService) private globalConfig,
        private stateService: StateService
    ) {
    }

    ngOnInit() {

        this.stateService.setLanguage(this.globalConfig.lang);
    }
}

import {NgModule} from '@angular/core';

import {GlobalConfigService} from '../services/global-config.service';
import {BaseHttpService} from '../services/base-http.service';
import {LoadingService} from '../services/loading.service';
import {TransService} from '../services/trans.service';
import {SubjectService} from '../services/subject.service';
import {StateService} from '../services/state.service';

import {ResHostPipe} from '../pipes/res-host.pipe';
import {BackgroundUrlPipe} from '../pipes/background-url.pipe';

@NgModule({
    declarations: [
        ResHostPipe,
        BackgroundUrlPipe
    ],
    exports: [
        ResHostPipe,
        BackgroundUrlPipe
    ],
    providers: [
        GlobalConfigService,
        BaseHttpService,
        LoadingService,
        TransService,
        SubjectService,
        StateService
    ]
})
export class SharedServicesModule {

}

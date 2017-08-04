import {NgModule} from '@angular/core';

import {GlobalConfigService} from '../services/global-config.service';
import {BaseHttpService} from '../services/base-http.service';
import {LoadingService} from '../services/loading.service';
import {LocaleService} from '../services/locale.service';
import {SubjectService} from '../services/subject.service';

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
        LocaleService,
        SubjectService
    ]
})
export class SharedModule {

}

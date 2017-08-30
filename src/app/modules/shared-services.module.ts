import {NgModule} from '@angular/core';

import {GlobalConfigService} from '../services/global-config.service';
import {BaseHttpService} from '../services/base-http.service';
import {LoadingService} from '../services/loading.service';
import {TransService} from '../services/trans.service';
import {SubjectService} from '../services/subject.service';
import {StateService} from '../services/state.service';

const services = [
    GlobalConfigService,
    BaseHttpService,
    LoadingService,
    TransService,
    SubjectService,
    StateService
];

@NgModule({
    providers: [
        ...services
    ]
})
export class SharedServicesModule {

}

import {NgModule} from '@angular/core';

import {GlobalConfigService} from '../services/global-config.service';
import {LoadingService} from '../services/loading.service';
import {TransService} from '../services/trans.service';
import {SubjectService} from '../services/subject.service';
import {StateService} from '../services/state.service';
import {EventMapService} from '../services/event-map.service';

const services = [
    GlobalConfigService,
    LoadingService,
    TransService,
    SubjectService,
    StateService,
    EventMapService
];

@NgModule({
    providers: [
        ...services
    ]
})
export class SharedServicesModule {

}

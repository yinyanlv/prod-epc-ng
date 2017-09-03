import {NgModule} from '@angular/core';

import {LoadingService} from '../services/loading.service';
import {SubjectService} from '../services/subject.service';
import {StateService} from '../services/state.service';
import {LoginGuardService} from '../services/guard.service';

const services = [
    LoadingService,
    SubjectService,
    StateService,
    LoginGuardService
];

@NgModule({
    providers: [
        ...services
    ]
})
export class SharedServicesModule {

}

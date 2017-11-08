import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {LoadingService} from '../services/loading.service';
import {SubjectService} from '../services/subject.service';
import {StateService} from '../services/state.service';
import {LoginGuardService} from '../services/guard.service';
import {AuthInterceptor} from '../base/base-http';

const services = [
    LoadingService,
    SubjectService,
    StateService,
    LoginGuardService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }
];

@NgModule({
    providers: [
        ...services
    ]
})
export class SharedServicesModule {

}

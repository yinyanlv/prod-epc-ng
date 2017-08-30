import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {SharedServicesModule} from '../../modules/shared-services.module';
import {LoginComponent} from './login.component';
import {LoginRouting} from './login.routing';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedServicesModule,
        LoginRouting
    ],
    declarations: [
        LoginComponent
    ]
})
export class LoginModule {
}

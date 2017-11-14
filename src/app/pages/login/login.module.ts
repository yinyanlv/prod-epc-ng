import {NgModule} from '@angular/core';

import {SharedModule} from '../../modules/shared.module';
import {LoginComponent} from './login.component';
import {LoginRouting} from './login.routing';

@NgModule({
    imports: [
        SharedModule,
        LoginRouting
    ],
    declarations: [
        LoginComponent
    ]
})
export class LoginModule {
}

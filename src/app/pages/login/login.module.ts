import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {SharedModule} from '../../modules/shared.module';
import {LoginComponent} from './login.component';
import {LoginRouting} from './login.routing';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        LoginRouting
    ],
    declarations: [
        LoginComponent
    ]
})
export class LoginModule {
}

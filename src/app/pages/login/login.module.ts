import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {SharedServicesModule} from '../../modules/shared-services.module';
import {SharedPipesModule} from '../../modules/shared-pipes.module';
import {LoginComponent} from './login.component';
import {LoginRouting} from './login.routing';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedServicesModule,
        SharedPipesModule,
        LoginRouting
    ],
    declarations: [
        LoginComponent
    ]
})
export class LoginModule {
}

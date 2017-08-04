import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {LoginComponent} from './login.component';
import {BackgroundSrcPipe} from '../../pipes/background-src.pipe';

import {LoginRouting} from './login.routing';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LoginRouting
    ],
    declarations: [
        LoginComponent,
        BackgroundSrcPipe
    ],
    exports: [
        BackgroundSrcPipe
    ],
    providers: []
})
export class LoginModule {
}

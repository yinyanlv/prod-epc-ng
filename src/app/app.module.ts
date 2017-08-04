import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';

import {SharedModule} from './modules/shared.module';
import {ErrorModule} from './pages/error/error.module';

import {AppComponent} from './app.component';
import {AppRouting} from './app.routing';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        AppRouting,
        SharedModule,
        ErrorModule
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}

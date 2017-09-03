import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {SharedServicesModule} from './modules/shared-services.module';
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
        RouterModule,
        BrowserAnimationsModule,
        AppRouting,
        SharedServicesModule,
        ErrorModule
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}

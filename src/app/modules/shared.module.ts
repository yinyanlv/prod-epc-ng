import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {HeaderComponent} from '../components/header/header.component';
import {FooterComponent} from '../components/footer/footer.component';
import {CrumbComponent} from '../components/crumb/crumb.component';
import {CheckboxComponent} from '../components/checkbox/checkbox.component';
import {GridComponent} from '../components/grid/grid.component';
import {GridColumnComponent} from '../components/grid/grid-column.component';
import {LoadingComponent} from '../components/loading/loading.component';
import {SearchComponent} from '../components/header/search/search.component';
import {CartComponent} from '../components/header/cart/cart.component';
import {DialogComponent} from '../components/dialog/dialog.component';
import {PaginationComponent} from '../components/pagination/pagination.component';
import {IconComponent} from '../components/icon/icon.component';

import {LoadingDirective} from '../directives/loading.directive';

import {ResHostPipe} from '../pipes/res-host.pipe';
import {BackgroundUrlPipe} from '../pipes/background-url.pipe';

import {LoadingService} from '../services/loading.service';
import {SubjectService} from '../services/subject.service';
import {StateService} from '../services/state.service';
import {LoginGuardService} from '../services/guard.service';
import {AuthInterceptor} from '../base/base-http';

const modules = [
    CommonModule,
    RouterModule,
    FormsModule
];

const directives = [
    LoadingDirective
];

const components = [
    HeaderComponent,
    FooterComponent,
    CrumbComponent,
    SearchComponent,
    CartComponent,
    DialogComponent,
    PaginationComponent,
    CheckboxComponent,
    GridComponent,
    GridColumnComponent,
    LoadingComponent,
    IconComponent
];

const pipes = [
    ResHostPipe,
    BackgroundUrlPipe
];

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
    imports: modules,
    declarations: [
        ...directives,
        ...components,
        ...pipes
    ],
    exports: [
        ...modules,
        ...directives,
        ...components,
        ...pipes
    ],
    entryComponents: [
        LoadingComponent,
        GridColumnComponent
    ],
    providers: services
})
export class SharedModule {
}

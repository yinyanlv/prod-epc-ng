import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {SharedPipesModule} from './shared-pipes.module';

import {HeaderComponent} from '../components/header/header.component';
import {FooterComponent} from '../components/footer/footer.component';
import {CrumbComponent} from '../components/crumb/crumb.component';
import {SearchComponent} from '../components/header/search/search.component';
import {CartComponent} from '../components/header/cart/cart.component';

const components = [
    HeaderComponent,
    FooterComponent,
    CrumbComponent,
    SearchComponent,
    CartComponent
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        SharedPipesModule
    ],
    declarations: [
        ...components
    ],
    exports: [
        ...components
    ]
})
export class SharedComponentsModule {
}

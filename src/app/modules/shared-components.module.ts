import {NgModule} from '@angular/core';

import {HeaderComponent} from '../components/header/header.component';
import {FooterComponent} from '../components/footer/footer.component';
import {CrumbComponent} from '../components/crumb/crumb.component';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        CrumbComponent
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        CrumbComponent
    ],
    providers: []
})
export class SharedComponentsModule {
}

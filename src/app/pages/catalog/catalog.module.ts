import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CatalogComponent } from './catalog.component';
import { CatalogService } from './catalog.service';
import { AppendRootPathPipe } from '../../pipes/append-root-path.pipe';
import { routing } from './catalog.routing';

@NgModule({
    imports: [
        CommonModule,
        routing
    ],
    declarations: [
        CatalogComponent,
        HeaderComponent,
        FooterComponent,
        AppendRootPathPipe
    ],
    providers: [CatalogService]
})
export class CatalogModule {
}

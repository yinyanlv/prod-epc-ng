import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ComponentModule} from './component.module';
import {HeaderComponent} from '../pages/common/header/header.component';
import {HeaderMiddleComponent} from '../pages/common/header/header-middle/header-middle.component';
import {FooterComponent} from '../pages/common/footer/footer.component';

// TODO，逐步迁移
import {HeaderComponent as StaticHeaderComponent} from '../pages/static/common/header/header.component';
import {NavigationComponent as StaticNavigationComponent} from '../pages/static/common/navigation/navigation.component';
import {LineTitleComponent as StaticLineTitleComponent} from '../pages/static/common/line-title/line-title.component';

const components = [
  HeaderComponent,
  HeaderMiddleComponent,
  FooterComponent,

  StaticHeaderComponent,  // TODO
  StaticNavigationComponent,  // TODO
  StaticLineTitleComponent // TODO
];

@NgModule({
  imports: [
    CommonModule,
    ComponentModule
  ],

  declarations: [
    ...components
  ],

  exports: [
    CommonModule,
    ComponentModule,
    ...components
  ]
})

export class SectionModule {
}

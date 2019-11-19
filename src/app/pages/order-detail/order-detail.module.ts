import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ComponentModule} from '../../modules/component.module';
import {SectionModule} from '../../modules/section.module';

import {OrderDetailComponent} from './order-detail.component';
import {OrderDetailService} from './order-detail.service';

import {routing} from './order-detail.routing';

@NgModule({
  imports: [
    ComponentModule,
    SectionModule,
    CommonModule,
    routing
  ],
  declarations: [
    OrderDetailComponent
  ],
  providers: [OrderDetailService]
})
export class OrderDetailModule {
}

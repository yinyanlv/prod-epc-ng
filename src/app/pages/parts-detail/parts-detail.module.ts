import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ComponentModule} from '../../modules/component.module';
import {SectionModule} from '../../modules/section.module';

import {PartsDetailComponent} from './parts-detail.component';
import {routing} from './parts-detail.routing';

import {PartsDetailService} from './parts-detail.service';

@NgModule({
  imports: [
    CommonModule,
    ComponentModule,
    SectionModule,
    routing
  ],
  declarations: [
    PartsDetailComponent
  ],
  providers: [PartsDetailService]
})
export class PartsDetailModule {
}

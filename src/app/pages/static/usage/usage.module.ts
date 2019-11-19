import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SectionModule} from '../../../modules/section.module';
import {UsageComponent} from './usage.component';
import {routing} from './usage.routing';

@NgModule({
  imports: [
    CommonModule,
    SectionModule,
    routing
  ],
  declarations: [
    UsageComponent
  ],
  providers: []
})
export class UsageModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComponentModule} from '../../modules/component.module';
import {SectionModule} from '../../modules/section.module';
import {UserCenterService} from './user-center.service';
import {routing} from './user-center.routing';

import {UserCenterComponent} from './user-center.component';
import {DealerInfoComponent} from './dealer-info/dealer-info.component';
import {SubAccountComponent} from './sub-account/sub-account.component';
import {AccountComponent} from './account/account.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {SystemInfoComponent} from './system-info/system-info.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentModule,
    SectionModule,
    routing
  ],
  declarations: [
    UserCenterComponent,
    DealerInfoComponent,
    SubAccountComponent,
    AccountComponent,
    ChangePasswordComponent,
    SystemInfoComponent
  ]
})
export class UserCenterModule {
}

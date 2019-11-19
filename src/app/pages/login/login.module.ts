import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {LoginComponent} from './login.component';
import {ComponentModule} from '../../modules/component.module';
import {LoginService} from './login.service';
import {ImgSrcPipe} from '../../pipes/img-src.pipe';

@NgModule({
  imports: [
    ComponentModule,
    CommonModule,
    FormsModule
  ],
  declarations: [
    LoginComponent,
    ImgSrcPipe
  ],
  exports: [
    ImgSrcPipe
  ],
  providers: [LoginService]
})
export class LoginModule {
}

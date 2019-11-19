import {Component, Input, ViewEncapsulation, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {GlobalConfigService} from '../../services/global-config.service';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent implements OnInit {

  isLoading: boolean = false;

  model: any = {};

  errorInfo: string;

  redirectUrl: string;

  verifySrc: string = this.gcService.get('path') + '/v-1.png';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private gcService: GlobalConfigService) {
  }

  ngOnInit() {
    // 重置登录状态
    this.authenticationService.logout();

    // 重定向的url
    this.redirectUrl = this.gcService.getQueryParams('returnUrl') || '/';
  }

  // 切换语言
  changeLang(lang) {
    // TODO
  }

  // 切换验证码
  changeVerifyCode(verifyImg) {
    verifyImg['src'] = this.gcService.get('path') + '/v-2.png';
  }

  // 登录提交
  login() {
    let params = this.getParams();

    this.isLoading = true;
    this.authenticationService
      .login(params)
      .subscribe(data => {
        this.router.navigate([this.redirectUrl]);
      }, error => {
        this.errorInfo = error.statusText || error;
        this.isLoading = false;
      });
  }

  // 获取提交参数
  getParams() {
    let params = {
      username: this.model.username,
      password: this.model.password
    };

    // 当验证码有值则添加到参数内
    if (this.model.validcode) {
      params['validcode'] = this.model.validcode;
    }

    return params;
  }
}

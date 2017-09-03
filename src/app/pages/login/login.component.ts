import {Component, ViewEncapsulation, OnInit, OnDestroy, Inject, Renderer2} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm, FormGroup} from '@angular/forms';

import {BaseComponent} from '../../base/base-component';
import {LoginService} from './login.service';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-login',
    templateUrl: './login.html',
    styleUrls: ['./login.scss'],
    providers: [LoginService]
})
export class LoginComponent extends BaseComponent implements OnInit, OnDestroy {

    private verifyCodePath: string = this.globalConfig.path + '/login/captcha';
    loginState: any;
    lang: string;
    verifyCodeSrc: string;
    isShowVerifyCode: boolean;
    loginBtnText: string = this.trans.t_009;
    errorInfo: string;

    constructor(
        private router: Router,
        private loginService: LoginService,
        private renderer2: Renderer2,
    ) {
        super();
    }

    ngOnInit() {

        this.changeVerifyCode();
        this.lang = this.stateService.getLanguage();
        this.isShowVerifyCode = this.getIsShowVerifyCode();

        this.loginState = {
            firstInvoke: false,
            isLogining: false
        };

        this.renderer2.addClass(document.documentElement, 'page-login');  // 给html标签，增加class，解决与主框架的css冲突
    }

    ngOnDestroy(): void {

        this.renderer2.removeClass(document.documentElement, 'page-login');
    }

    login(params: NgForm): void {

        let loginState = this.loginState;

        if (params.form.valid) {

            this.loginService.login({
                body: params.form.value,
                beforeRequest: () => {

                    loginState.isLogining = true;
                    this.loginBtnText = this.trans.t_008;
                },
                callback: () => {

                    loginState.isLogining = false;
                    this.loginBtnText = this.trans.t_009;
                },
                success: (res) => {

                    if (res.success) {

                        this.setIsShowVerifyCode(false);
                        this.errorInfo = '';
                        this.router.navigate(['/catalog']);
                    } else {

                        res.needVerifyCode ? this.setIsShowVerifyCode(true) : this.setIsShowVerifyCode(false);

                        this.errorInfo = res.message || '用户名或密码错误';
                        this.changeVerifyCode();
                    }
                }
            });
        } else {
            this.updateErrorInfo(params.form);
        }

        loginState.firstInvoke = true;
    }

    updateErrorInfo(form: FormGroup) {
        let error = this.trans.t_010;
        let username = form.get('username');
        let password = form.get('password');
        let verifyCode = form.get('verifyCode');

        if (username.invalid && password.invalid) {
            error += this.trans.t_017 + '、' + this.trans.t_018;
        } else if (username.invalid) {
            error += this.trans.t_017;
        } else if (password.invalid) {
            error += this.trans.t_018;
        } else if (verifyCode && verifyCode.invalid) {
            error += this.trans.t_019;
        }

        this.errorInfo = error;
    }

    changeLang(lang: string): void {

        if (lang === this.lang) return;

        this.loginService.changeLang(lang);
    }

    changeVerifyCode(): void {

        this.verifyCodeSrc = this.verifyCodePath + '?_dc=' + (+new Date());
    }

    getIsShowVerifyCode(): boolean {

        return sessionStorage.getItem('isShowVerifyCode') === 'true';
    }

    setIsShowVerifyCode(isShow: boolean): void {

        this.isShowVerifyCode = isShow;
        sessionStorage.setItem('isShowVerifyCode', isShow.toString());
    }
}

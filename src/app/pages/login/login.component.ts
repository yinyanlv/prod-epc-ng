import {Component, ViewEncapsulation, OnInit, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm, FormGroup} from '@angular/forms';

import {GlobalConfigService} from '../../services/global-config.service';
import {TransService} from '../../services/trans.service';
import {StateService} from '../../services/state.service';
import {LoginService} from './login.service';


@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-login',
    templateUrl: './login.html',
    styleUrls: ['./login.scss'],
    providers: [LoginService]
})
export class LoginComponent implements OnInit {

    private verifyCodePath: string = '/user/login/captcha';
    loginState: any;
    lang: string;
    verifyCodeSrc: string;
    loginErrorCount: number;
    loginBtnText: string = this.trans.t_009;
    errorInfo: string;

    constructor(
        private router: Router,
        private loginService: LoginService,
        private stateService: StateService,
        @Inject(GlobalConfigService) public globalConfig,
        @Inject(TransService) public trans
    ) {
    }

    ngOnInit() {

        this.changeVerifyCode();
        this.lang = this.stateService.getLanguage();
        this.loginErrorCount = this.getLoginErrorCount();

        this.loginState = {
            firstInvoke: false,
            isLogining: false
        };
    }

    login(params: NgForm): void {

        let loginState = this.loginState;

        if (params.form.valid) {

            loginState.isLogining = true;
            this.loginBtnText = this.trans.t_008;

            this.loginService.login(params.form.value).subscribe(res => {

                loginState.isLogining = false;
                this.loginBtnText = this.trans.t_009;

                if (res.success) {

                    this.router.navigate(['/catalog']);
                } else {

                    this.errorInfo = res.message || '';
                    this.changeVerifyCode();
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

        this.loginService.changeLang(lang).subscribe(res => {
            window.location.reload(true);
        });
    }

    changeVerifyCode(): void {

        this.verifyCodeSrc = this.verifyCodePath + '?_dc=' + (+new Date());
    }

    getLoginErrorCount(): number {

        return parseInt(sessionStorage.getItem('loginErrorCount') || '0');
    }

    setLoginErrorCount(num: number): void {

        sessionStorage.setItem('loginErrorCount', num.toString());
    }
}

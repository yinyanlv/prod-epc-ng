import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';

import { LocaleService } from '../../services/locale.service';
import { GlobalConfigService } from '../../services/global-config.service';
import { LoginService } from './login.service';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-login',
    templateUrl: './login.html',
    styleUrls: ['./login.scss']
})
export class LoginComponent implements OnInit {

    @Input() loginInfo: any;
    @Input() errorInfo: any;
    loginCfg: any;
    lang: string = 'zh';
    trans: any;
    invokeValided: Boolean = false;
    verifySrc: string;

    constructor(private loginService: LoginService, private localeTrans: LocaleService, private globalConfigService: GlobalConfigService) {
        this.lang = this.globalConfigService["lang"];
        this.trans = localeTrans[this.lang];
    }

    login(params: any): void {
        let loginInfo = this.loginInfo;
        let loginCfg = this.loginCfg;

        if (this.validateForm()) {
            this.loginCfg.loginText = this.trans['t_008'];
            loginCfg.requestFlag = true;

            this.loginService.login(params).subscribe(res => {
                debugger;

                if (res.success) {
                    //     // navigator
                    window.location.href = this.globalConfigService['path'] + "/catalog";
                } else {
                    this.errorInfo = res.message || "Error Info";
                    this.invokeValided = true;// !!res.needVerifyCode;
                    loginCfg.loginText = this.trans['t_009'];
                    loginCfg.requestFlag = false;

                    this.verifySrc =  this.globalConfigService['path'] + "/user/login/captcha?_dc=" + (+new Date());;
                }
            });
        }

        loginCfg.firstInvoke = true;
    }

    validateForm(): Boolean {
        let rst = false;
        let loginInfo = this.loginInfo;
        let error = this.trans['t_010'];

        if (this.invokeValided) {

            if (!loginInfo.name.trim() && !loginInfo.pwd.trim() && !loginInfo.validcode.trim()) {
                error += this.trans['t_017'] + '、' + this.trans['t_018'];
            } else if (!loginInfo.name.trim()) {
                error += this.trans['t_017'];
            } else if (!loginInfo.pwd.trim()) {
                error += this.trans['t_018'];
            } else if (!loginInfo.validcode.trim()) {
                error += this.trans['t_019'];
            } else {
                rst = true;
            }
        } else {
            if (!loginInfo.name.trim() && !loginInfo.pwd.trim()) {
                error += this.trans['t_017'] + '、' + this.trans['t_018'];
            } else if (!loginInfo.name.trim()) {
                error += this.trans['t_017'];
            } else if (!loginInfo.pwd.trim()) {
                error += this.trans['t_018'];
            } else {
                rst = true;
            }
        }
        this.errorInfo = error;
        return rst;
    }

    changeLang(lang: string): void {
        if (lang == this.lang) return;
        this.loginService.changeLang(lang).subscribe(res => {
            window.location.reload(true);
        });
    }

    changeVerifyCode(verifyImg: Object): void {
        verifyImg['src'] = this.verifySrc + (+new Date());
    }

    ngOnInit() {

        this.loginCfg = {
            loginText: this.trans['t_009'],
            firstInvoke: false,
            requestFlag: false
        };

        this.loginInfo = {
            name: '',
            pwd: '',
            validcode: ''
        };
    }
}

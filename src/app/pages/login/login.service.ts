import {Injectable} from '@angular/core';

import {BaseHttp, BaseHttpOptions} from '../../base/base-http';

@Injectable()
export class LoginService extends BaseHttp {

    private loginPath: string = '/login';
    private changeLangPath: string = '/change-locale?locale=';

    login(options: BaseHttpOptions) {

        options.url = this.globalConfig.path + this.loginPath;

        this.post(options);
    }

    changeLang(lang: string) {

        this.get({
            url: this.globalConfig.path + this.changeLangPath + lang
        });
    }
}

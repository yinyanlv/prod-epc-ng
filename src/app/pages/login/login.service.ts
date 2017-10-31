import {Injectable} from '@angular/core';

import {BaseHttp, BaseHttpOptions} from '../../base/base-http';

@Injectable()
export class LoginService extends BaseHttp {

    private loginPath: string = '/login';
    private changeLangPath: string = '/change-locale?locale=';

    login(opts: BaseHttpOptions) {

        opts.url = this.globalConfig.path + this.loginPath;

        this.post(opts);
    }

    changeLang(lang: string) {

        this.get({
            url: this.globalConfig.path + this.changeLangPath + lang
        });
    }
}

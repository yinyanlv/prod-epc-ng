import {Injectable} from '@angular/core';

import {BaseHttpService, BaseHttpOptions} from '../../services/base-http.service';

@Injectable()
export class LoginService extends BaseHttpService {

    private loginPath: string = '/login1333';
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

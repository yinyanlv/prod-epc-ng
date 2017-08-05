import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs';

import {BaseHttpService, BaseHttpConfig} from '../../services/base-http.service';

@Injectable()
@BaseHttpConfig()
export class LoginService extends BaseHttpService {

    private loginPath: string = '/login';
    private changeLangPath: string = '/change-locale?locale=';

    login(params: Object): Observable<any> {

        return this.post(this.globalConfig.path + this.loginPath, params);
    }

    changeLang(lang: string): Observable<any> {

        return this.get(this.globalConfig.path + this.changeLangPath + lang);
    }
}

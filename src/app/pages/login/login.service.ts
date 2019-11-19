import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {GlobalConfigService} from '../../services/global-config.service';

@Injectable()
export class LoginService {
  private loginUrl = this.globalConfigService.get('path') + '/user/login';
  private langUrl = this.globalConfigService.get('path') + 'change-locale?locale=';
  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(private http: Http, private globalConfigService: GlobalConfigService) {
  }

  login(params: Object): Observable<any> {

    return this.http
      .post(this.loginUrl, params)
      .map((res) => {
        debugger;
        let cc = res.json();
        return cc;
      }).catch(this.handleError);
  }

  changeLang(lang: string): Observable<any> {
    return this.http
      .get(this.langUrl + lang).catch(this.handleError);
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return Observable.of<any>([]);
  }
}

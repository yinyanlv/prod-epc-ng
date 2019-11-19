import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {GlobalConfigService, EVENTS_MAP} from '../services/global-config.service';

@Injectable()
export class AuthenticationService {
  private authenticateUrl: string = this.gcConfigService.get('path') + 'authenticate';

  constructor(private http: HttpClient,
              private gcConfigService: GlobalConfigService) {
  }

  // 登录
  public login(params) {

    return this.http.post<any>(this.authenticateUrl, params)
      .map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));

        return user;
      });
  }

  // 登出
  public logout() {
    localStorage.removeItem('currentUser');
  }
}

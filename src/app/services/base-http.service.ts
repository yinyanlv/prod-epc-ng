import {Injectable, Inject} from '@angular/core';
import {Http, Request, Response, RequestMethod, RequestOptionsArgs, RequestOptions} from '@angular/http';
import {Observable, Subscription} from 'rxjs';
import 'rxjs/add/operator/map';

import {GlobalConfigService} from './global-config.service';

export interface BaseHttpOptions extends RequestOptionsArgs {
    beforeRequest?: Function,
    success?: Function,
    failure?: Function,
    callback?: Function
}

@Injectable()
export class BaseHttpService {

    constructor(protected http: Http,
                @Inject(GlobalConfigService) protected globalConfig) {
    }

    protected request(method: RequestMethod, options: BaseHttpOptions = {}): Subscription {

        options.method = method;

        options.withCredentials = true;  // 解决ajax跨域，session无效的问题

        let requestOptions = new RequestOptions(options);

        options.beforeRequest && options.beforeRequest(requestOptions);

        let observable: Observable<Response> = this.http.request(new Request(requestOptions));

        return observable
            .map(res => {

                return res.json();
            })
            .catch(this.errorHandler.bind(this))
            .subscribe((res) => {

                options.success && options.success(res);
                options.callback && options.callback(res);
            }, (err) => {

                options.failure && options.failure(err);
                options.callback && options.callback(err);
            });
    }

    protected get(options: BaseHttpOptions): Subscription {

        return this.request(RequestMethod.Get, options);
    }

    protected post(options: BaseHttpOptions): Subscription {

        return this.request(RequestMethod.Post, options);
    }

    protected put(options: BaseHttpOptions): Subscription {

        return this.request(RequestMethod.Put, options);
    }

    protected delete(options: BaseHttpOptions): Subscription {

        return this.request(RequestMethod.Delete, options);
    }

    protected errorHandler(err: any): Observable<any> {

        return Observable.throw(err);
    }
}



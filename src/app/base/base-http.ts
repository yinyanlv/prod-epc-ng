import {Injectable} from '@angular/core';
import {
    HttpClient,
    HttpHeaders,
    HttpParams,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';

import {globalConfig} from '../etc/provider';

export interface BaseHttpOptions {
    url?: string;
    body?: any;
    headers?: HttpHeaders;
    params?: HttpParams;
    observe?: 'body' | 'events' | 'response';
    reportProgress?: boolean;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    withCredentials?: boolean;
    beforeSend?: Function;
    success?: Function;
    error?: Function;
    complete?: Function;
}

@Injectable()
export class BaseHttp {

    public globalConfig: any = globalConfig;

    constructor(public http: HttpClient) {
    }

    public get(opts: BaseHttpOptions): HttpProxy {

        return new HttpProxy(this, 'GET', opts);
    }

    public post(opts: BaseHttpOptions): HttpProxy {

        return new HttpProxy(this, 'POST', opts);
    }

    public put(opts: BaseHttpOptions): HttpProxy {

        return new HttpProxy(this, 'PUT', opts);
    }

    public delete(opts: BaseHttpOptions): HttpProxy {

        return new HttpProxy(this, 'DELETE', opts);
    }

    public request(method: string, opts: BaseHttpOptions): Observable<any> {

        let newOpts = Object.assign({
            responseType: 'json',
            withCredentials: true  // 解决ajax跨域时，session在各请求间不共享，总是新建一条的问题
        }, opts);

        return this.http.request(method, opts.url, newOpts);
    }

    public serial() {

    }

    public parallel() {

    }
}

class HttpProxy {

    public subscribe: Function;

    constructor(baseHttp: BaseHttp, method: string, opts: BaseHttpOptions) {

        this.subscribe = (handlers: {
            next?: (value: any) => void;
            error?: (value: any) => void;
            complete?: () => void
        }): Subscription => {

            return baseHttp.request(method, opts).subscribe(
                handlers.next,
                handlers.error ? handlers.error : (err) => {
                    console.log('global error handler');
                },
                handlers.complete
            );
        };
    }
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).map((event) => {

            return event;
        });
    }
}

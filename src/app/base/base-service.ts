import {Injectable} from '@angular/core';
import {RequestOptionsArgs} from '@angular/http';
import {HttpClient, HttpHeaders, HttpParams, HttpObserve} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {globalConfig} from '../etc/provider';

export interface IBaseHttpOptions {
    body?: any;
    headers?: HttpHeaders;
    params?: HttpParams;
    observe?: HttpObserve;
    reportProgress?: boolean;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    withCredentials?: boolean;
}

@Injectable()
export class BaseService {

    protected globalConfig: Object = globalConfig;

    constructor(
        protected http: HttpClient
    ) {
    }

    protected get(opts: RequestOptionsArgs): Observable<any> {

        return this.request('GET', opts);
    }

    protected post(opts: RequestOptionsArgs): Observable<any> {

        return this.request('POST', opts);
    }

    protected put(opts: RequestOptionsArgs): Observable<any> {

        return this.request('PUT', opts);
    }

    protected delete(opts: RequestOptionsArgs): Observable<any> {

        return this.request('DELETE', opts);
    }

    protected request(method: string, opts: RequestOptionsArgs): Observable<any> {

        return this.http.request(method, '');
    }
}

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import {Observable, Subscription, Subject} from 'rxjs';
import {catchError} from 'rxjs/operators';

// http client request 使用的参数模型
export interface BaseHttpOptions {
  body?: any;
  headers?: HttpHeaders;
  params?: HttpParams;
  observe?: 'body' | 'events' | 'response';
  reportProgress?: boolean;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
  withCredentials?: boolean;
}

// request 方法使用的参数模型
export interface RequestOptions extends BaseHttpOptions {
  method: string,
  url: string
}

@Injectable()
export class BaseHttp {

  constructor(
    public httpClient: HttpClient
  ) {
  }

  /**
   * 读取数据
   *
   * @param {any} options 当前参数对象
   *
   * @returns {Observable<any>}
   */
  public get(options: any): Observable<any> {
    let url = options.url;

    return this.httpClient
      .get(options.url, options)
      .pipe(catchError(this.handleError));
  }

  /**
   * 创建数据
   *
   * @param {any} options 当前参数对象
   *
   * @returns {Observable<any>}
   */
  public post(options: any): Observable<any> {
    let url = options.url,
      body = options.body;

    return this.httpClient
      .post(url, body, options)
      .pipe(catchError(this.handleError));
  }

  /**
   * 删除数据
   *
   * @param {any} options 当前参数对象
   *
   * @returns {Observable<any>}
   */
  public delete(options: any): Observable<any> {
    let url = options.url;

    return this.httpClient
      .delete(url, options)
      .pipe(catchError(this.handleError));
  }

  /**
   * 更新数据
   *
   * @param {any} options 当前参数对象
   *
   * @returns {Observable<any>}
   */
  public put(options: any): Observable<any> {
    let url = options.url,
      body = options.body;

    return this.httpClient
      .put(url, body, options)
      .pipe(catchError(this.handleError));
  }

  /**
   * 远程请求，包含上面的增删改查功能
   *
   * @param {RequestOptions} requestOptions 当前参数对象
   *
   * @returns {Observable<any>}
   */
  public request(requestOptions: RequestOptions): Observable<any> {
    let method = requestOptions.method,
      url = requestOptions.url,
      options = this.getRequestOptions(requestOptions);

    return this.httpClient
      .request(method, url, options)
      .pipe(catchError(this.handleError));
  }

  /**
   * 统一处理请求错误，根据http状态，进入不同处理过程
   *
   * @param {HttpErrorResponse} error 当前参数对象
   *
   * @returns null
   */
  public handleError(error: HttpErrorResponse) {

    switch (error.status) {
      case 0:
        console.error('网络问题, 请检查当前网络在重试。');
        break;
      case 401:
        console.error('当前登录的会话已经过期，请重新登录。');
        location.href = location.href;
        break;
      case 500:
        console.error('请求未完成,服务器遇到不可预知的情况。');
        break;
      case 599:
        console.error(error.message);
        break;
      default:
        console.error(error.statusText);
        break;
    }

    return '';
  }

  /**
   * 转换httpclient所需要的参数选项
   *
   * @param {HttpErrorResponse} error 当前参数对象
   *
   * @returns null
   */
  private getRequestOptions(options: RequestOptions) {

    // 默认值设置
    let httpOptions: BaseHttpOptions = {
      body: '',
      headers: new HttpHeaders(),
      params: new HttpParams(),
      observe: 'body',
      reportProgress: true,
      responseType: 'json',
      withCredentials: true
    };

    // 拷贝字段
    Object.keys(options).forEach(key => {
      if (key in httpOptions) {
        httpOptions[key] = options[key];
      }
    });

    return httpOptions;
  }
}

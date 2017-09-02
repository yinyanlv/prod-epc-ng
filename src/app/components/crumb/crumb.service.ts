import {Injectable} from '@angular/core';

import {BaseHttp, BaseHttpOptions} from '../../base/base-http';

@Injectable()
export class CrumbService extends BaseHttp {

    getCrumbs(): Array<any> {

        return [{
            code: 'a',
            name: '品牌：上汽大通',
            href: '/catalog',
            queryParams: {m_1: 'MAXUS'}
        }, {
            code: 'b',
            name: '平台：D90',
            href: '/catalog',
            queryParams: {m_1: 'MAXUS'}
        }, {
            code: 'c',
            name: '左右舵+驱动形式：全部',
            href: '/catalog',
            queryParams: {m_1: 'MAXUS'}
        }, {
            code: 'd',
            name: '车型系列细分：全部',
            href: '',
            queryParams: ''
        }];
    }
}

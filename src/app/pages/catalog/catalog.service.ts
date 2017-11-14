import {Injectable} from '@angular/core';

import {BaseHttp, BaseHttpOptions} from '../../base/base-http';

@Injectable()
export class CatalogService extends BaseHttp {

    private selectorPath: string = this.globalConfig.path + '/selector/catalog';

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

    getBrandList() {

        return this.get({
            url: this.selectorPath
        });
    }

    getSeriesList(parentCode: string) {

        return this.get({
            url: this.selectorPath + '?parentGrade=g1&parentCode=' + parentCode
        });
    }

    getConditionList1(parentCode: string) {

        return this.get({
            url: this.selectorPath + '?parentGrade=g2&parentCode=' + parentCode
        });
    }

    getConditionList2(parentCode: string) {

        return this.get({
            url: this.selectorPath + '?parentGrade=g3&parentCode=' + parentCode
        });
    }

    getConditionList3(parentCode: string) {

        return this.get({
            url: this.selectorPath + '?parentGrade=g4&parentCode=' + parentCode
        });
    }
}

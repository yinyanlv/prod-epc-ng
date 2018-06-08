import {Injectable} from '@angular/core';

import {BaseHttp, BaseHttpOptions} from '../../base/base-http';

@Injectable()
export class CatalogService extends BaseHttp {

    private selectorPath: string = this.globalConfig.path + '/selector/catalog';

    getCrumbs(): Array<any> {

        return [{
            code: 'a',
            text: '品牌：上汽大通',
            path: '/catalog',
            queryParams: {m_1: 'MAXUS'}
        }, {
            code: 'b',
            text: '平台：D90',
            path: '/catalog',
            queryParams: {m_1: 'MAXUS'}
        }, {
            code: 'c',
            text: '左右舵+驱动形式：全部',
            path: '/catalog',
            queryParams: {m_1: 'MAXUS'}
        }, {
            code: 'd',
            text: '车型系列细分：全部'
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

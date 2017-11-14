import {Injectable} from '@angular/core';

import {BaseHttp, BaseHttpOptions} from '../../base/base-http';

@Injectable()
export class CatalogService extends BaseHttp {

    private selectorPath: string = this.globalConfig.path + '/selector/catalog';

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

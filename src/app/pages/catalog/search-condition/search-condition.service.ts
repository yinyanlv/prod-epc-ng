import {Injectable} from '@angular/core';

import {BaseHttp, BaseHttpOptions} from '../../../base/base-http';

@Injectable()
export class SearchConditionService extends BaseHttp {

    private selectorPath: string = this.globalConfig.path + '/selector/catalog';

    getConditionList1(parentCode: string, opts: BaseHttpOptions) {

        opts.url = this.selectorPath + '?parentGrade=g2&parentCode=' + parentCode;
        this.get(opts);
    }

    getConditionList2(parentCode: string, opts: BaseHttpOptions) {

        opts.url = this.selectorPath + '?parentGrade=g3&parentCode=' + parentCode;
        this.get(opts);
    }

    getConditionList3(parentCode: string, opts: BaseHttpOptions) {

        opts.url = this.selectorPath + '?parentGrade=g4&parentCode=' + parentCode;
        this.get(opts);
    }
}

import {Injectable} from '@angular/core';
import {BaseHttp, BaseHttpOptions} from '../../../base/base-http';

@Injectable()
export class BrandSeriesService extends BaseHttp {

    private selectorPath: string = this.globalConfig.path + '/selector/catalog';

    getBrandList() {

        return this.get(this.selectorPath);
    }

    getSeriesList(parentCode: string) {

        return this.get({
            url: this.selectorPath + '?parentGrade=g1&parentCode=' + parentCode
        });
    }
}

import {Injectable} from '@angular/core';
import {BaseHttp, BaseHttpOptions} from '../../../base/base-http';

@Injectable()
export class BrandSeriesService extends BaseHttp {

    private selectorPath: string = this.globalConfig.path + '/selector/catalog';

    getBrandList(opts: BaseHttpOptions) {

        opts.url = this.selectorPath;
        this.get(opts);
    }

    getSeriesList(parentCode: string, opts: BaseHttpOptions) {

        opts.url = this.selectorPath + '?parentGrade=g1&parentCode=' + parentCode;
        this.get(opts);
    }
}

import {Injectable} from '@angular/core';

import {BaseHttp} from '../../base/base-http';

@Injectable()
export class UsageService extends BaseHttp {

    getGroupList() {

        return [{
            code: '1',
            name: '测试测试',
            isExpanded: true,
            children: [{
                code: '1-1',
                name: '哈哈哈',
                isExpanded: true,
            }, {
                code: '1-2',
                name: '出的互粉',
                isExpanded: true,
            }]
        }, {
            code: '2',
            name: '等级积分',
            isSelected: false,
            isExpanded: true,
            children: [{
                code: '2-1',
                name: '绝地反击恶风',
                isExpanded: true,
            }, {
                code: '2-2',
                name: '飞机覅解禁额分',
                isExpanded: true,
            }]
        }];
    }
}

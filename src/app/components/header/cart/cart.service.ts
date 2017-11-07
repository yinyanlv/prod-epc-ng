import {Injectable} from '@angular/core';

import {BaseHttp, BaseHttpOptions} from '../../../base/base-service';

@Injectable()
export class CartService extends BaseHttp {

    getOrders(): Array<any> {

        this.get({
            url: this.globalConfig.path + '/selector/catalog'
        }).subscribe({
            next: (res) => {
                console.log(res);
            }
        });

        return [];

        // return [{
        //     id: 101,
        //     partCode: 'B00004034',
        //     partName: '六角法兰面螺栓',
        //     num: 1
        // }, {
        //     id: 102,
        //     partCode: 'C00064853',
        //     partName: 'ECU支架',
        //     num: 1
        // }, {
        //     id: 103,
        //     partCode: 'C00094027',
        //     partName: '变速器操纵杆手柄',
        //     num: 1
        // }, {
        //     id: 104,
        //     partCode: 'C00102782',
        //     partName: '变速器操纵杆防尘罩',
        //     num: 4
        // }];
    }

    deleteOrder(orderId: string | number) {

        console.log(orderId);
    }
}

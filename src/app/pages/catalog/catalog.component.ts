import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {BaseComponent} from '../../base/base-component';
import {CatalogService} from './catalog.service';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-catalog',
    templateUrl: './catalog.html',
    styleUrls: ['./catalog.scss'],
    providers: [
        CatalogService
    ]
})
export class CatalogComponent extends BaseComponent implements OnInit {

    crumbs: Array<any>;

    brandList: Array<any>;
    seriesList: Array<any>;
    activeBrand: string;
    activeSeries: string;

    isShowConditions: boolean = true;
    activeCode1: string = '';
    activeCode2: string = '';
    list1: Array<any>;
    list2: Array<any>;
    list3: Array<any>;
    isCollapsed1: boolean = true;
    isCollapsed2: boolean = true;
    isCollapsed3: boolean = true;

    constructor(
        private service: CatalogService,
        private router: Router
    ) {
        super();
    }

    ngOnInit() {

        this.service.getBrandList()
            .serial((res) => {

                this.brandList = res.list;
                this.activeBrand = res.list[0].code;

                return this.service.getSeriesList(this.activeBrand);
            })
            .subscribe({
                next: (res) => {

                    this.seriesList = res.list;
                }
            });

        this.service.getConditionList1('D90')
            .serial((res) => {

                this.list1 = res.list;

                return this.service.getConditionList2(this.list1[0].code);
            })
            .serial((res) => {

                this.list2 = res.list;

                return this.service.getConditionList3(this.list2[0].code);
            })
            .subscribe({
                next: (res) => {

                    this.list3 = res.list;
                }
            });

        this.crumbs = this.service.getCrumbs();
    }

    setActiveBrand(code: string) {

        this.activeBrand = code;
    }

    setActiveSeries(code: string) {

        this.activeSeries = code;
    }

    handleStatusChange(isChecked: boolean) {

        console.log(isChecked);
    }
}

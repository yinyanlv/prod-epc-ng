import {Component, OnInit, ViewEncapsulation, ViewChild, ViewContainerRef} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {BaseComponent} from '../../base/base-component';
import {CatalogService} from './catalog.service';
import {LoadingDirective} from "../../directives/loading.directive";

import {fadeAnimation} from '../../animations/fade.animation';
import {removeAnimation} from '../../animations/remove.animation';
import {runChildrenAnimation} from '../../animations/run-children.animation';
import {listAnimation} from '../../animations/list.animation';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-catalog',
    templateUrl: './catalog.html',
    styleUrls: ['./catalog.scss'],
    providers: [
        CatalogService
    ],
    animations: [fadeAnimation, removeAnimation, runChildrenAnimation, listAnimation]
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

    parent: string = 'parent';
    childA: string = 'child a';
    childB: string = 'child b';

    @ViewChild('loading', {read: LoadingDirective})
    loading;

    abc: Array<any> = [99,9999 ,2233];

    isShow: boolean = true;

    constructor(
        private service: CatalogService,
        private router: Router
    ) {
        super();
    }

    ngOnInit() {

        setTimeout(() => {

            this.isShow = false;
        }, 6000);

        setTimeout(() => {
            this.abc = [1, 3];
        }, 3000);

        setTimeout(() => {
            this.loading.show();

            setTimeout(() => {

                this.loading.hide();
            }, 2000)
        }, 2000);
        // setTimeout(() => {
        //     let a = new Date();
        //
        //     this.parent = 'parent ' + a;
        //     this.childA = 'child a ' + a;
        //
        // }, 5000);

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

    show(e) {
        console.log(e);
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

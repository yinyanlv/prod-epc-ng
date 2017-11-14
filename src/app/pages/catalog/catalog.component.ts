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

    brandList: Array<any>;
    seriesList: Array<any>;
    activeBrand: string;
    activeSeries: string;

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
    }

    setActiveBrand(code: string) {

        this.activeBrand = code;
    }

    setActiveSeries(code: string) {

        this.activeSeries = code;
    }
}

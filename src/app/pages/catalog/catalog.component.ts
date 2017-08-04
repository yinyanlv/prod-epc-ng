import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';


import { TransService } from '../../services/trans.service';
import { GlobalConfigService } from '../../services/global-config.service';
import { CatalogService } from './catalog.service';


@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.html',
    styleUrls: ['./catalog.scss']
})
export class CatalogComponent implements OnInit {
    lang: string = 'zh';
    trans: any;
    brands: any;
    seriesList: any;
    seriesId: string;

    constructor(
        private catalogService: CatalogService,
        private localeTrans: TransService,
        private globalConfigService: GlobalConfigService,
        private router: Router
    ) {
        this.lang = this.globalConfigService["lang"];
        this.trans = localeTrans[this.lang];
    }

    getSeriesList(id: string): void {
        let p = 'm_1=' + id;
        this.catalogService.getSeriesList(p).subscribe(res => {
            this.seriesList = res;
        });
    }

    onClickBrand(params: Object): void {
        this.getSeriesList(params["id"]);
    }

    onClickSeries(series: Object): void {
        this.seriesId = series['id'];
       // this.router.navigate(['/catalog','test']);
    }

    ngOnInit() {
        this.catalogService.initBrand().subscribe(res => {
            if (res.length) {
                this.getSeriesList(res[0]["id"]);
            }

            this.brands = res;
        });
    }

}

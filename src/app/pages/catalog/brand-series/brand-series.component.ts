import {Component, ViewEncapsulation, OnInit} from '@angular/core';

import {BaseComponent} from '../../../base/base-component';
import {BrandSeriesService} from './brand-series.service';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'brand-series',
    templateUrl: './brand-series.html',
    styleUrls: ['./brand-series.scss'],
    providers: [BrandSeriesService]
})
export class BrandSeriesComponent extends BaseComponent implements OnInit {

    private brandList: Array<any>;
    private seriesList: Array<any>;
    private activeBrand: string;
    private activeSeries: string;

    constructor(
        private brandSeriesService: BrandSeriesService
    ) {
        super();
    }

    ngOnInit() {

        this.brandSeriesService.getBrandList({
            success: (res) => {

                this.brandList = res.list;
                this.activeBrand = res.list[0].code;

                this.brandSeriesService.getSeriesList(this.activeBrand, {
                    success: (res) => {

                        this.seriesList = res.list;
                    }
                });
            }
        });
    }

    setActiveBrand(brandCode: string) {

        this.activeBrand = brandCode;
    }

    setActiveSeries(seriesCode: string) {

        this.activeSeries = seriesCode;
    }
}

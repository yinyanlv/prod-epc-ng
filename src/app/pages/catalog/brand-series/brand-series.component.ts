import {Component, ViewEncapsulation, OnInit} from '@angular/core';

import {BaseComponent} from '../../../base/base-component';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'brand-series',
    templateUrl: './brand-series.html',
    styleUrls: ['./brand-series.scss']
})
export class BrandSeriesComponent extends BaseComponent implements OnInit {

    ngOnInit() {

    }
}

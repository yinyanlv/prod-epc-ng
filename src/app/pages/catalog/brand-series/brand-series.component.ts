import {Component, ViewEncapsulation, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'brand-series',
    templateUrl: './brand-series.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrandSeriesComponent {

    @Input()
    brandList: Array<any>;

    @Input()
    seriesList: Array<any>;

    @Input()
    activeBrand: string;

    @Input()
    activeSeries: string;

    @Output()
    private clickBrand: EventEmitter<string> = new EventEmitter<string>();

    @Output()
    private clickSeries: EventEmitter<string> = new EventEmitter<string>();

    onClickBrand(brandCode: string) {

        this.clickBrand.emit(brandCode);
    }

    onClickSeries(seriesCode: string) {

        this.clickSeries.emit(seriesCode);
    }
}

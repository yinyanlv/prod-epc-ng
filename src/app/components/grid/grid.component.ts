import {Component, Input, ContentChildren, QueryList, OnInit, AfterContentInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

import {GridColumnComponent} from './grid-column.component';

@Component({
    selector: 's-grid',
    templateUrl: 'grid.html',
    styleUrls: ['grid.scss']
})
export class GridComponent implements OnInit, AfterContentInit {

    @Input()
    isDynamic: boolean = false;

    @Input()
    data: Array<any>;

    @ContentChildren(GridColumnComponent)
    columnList: QueryList<GridColumnComponent>;

    columns: Array<GridColumnComponent>;

    constructor(
        private sanitizer: DomSanitizer
    ) {
    }

    ngOnInit() {
        var self = this;
    }

    ngAfterContentInit() {

        this.columns = this.columnList.toArray();
    }

    renderHtml(str: string) {

        return  this.sanitizer.bypassSecurityTrustHtml(str);
    }
}

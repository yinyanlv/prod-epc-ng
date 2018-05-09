import {Component, Input, ViewChild, ContentChildren, QueryList, ComponentFactoryResolver, ViewContainerRef, OnInit, AfterContentInit} from '@angular/core';

import {LoadingDirective} from "../../directives/loading.directive";
import {GridColumnComponent} from './grid-column.component';

@Component({
    selector: 's-grid',
    templateUrl: 'grid.html',
    styleUrls: ['grid.scss']
})
export class GridComponent implements OnInit, AfterContentInit {

    private rowNumberTitle: string = '序号';

    @ViewChild('loading', {read: LoadingDirective})
    loading;

    @Input()
    private isDynamic: boolean = false;

    @Input()
    private withCheckbox: boolean = false;

    @Input()
    private withRowNumber: boolean = false;

    @Input()
    private checkboxModel: string = 'multiple';  // single | multiple

    @Input()
    store: Array<any>;

    @ContentChildren(GridColumnComponent)
    private columnList: QueryList<GridColumnComponent>;

    private columns: Array<GridColumnComponent>;

    private isSelectAll: boolean = false;

    constructor(
        private vcRef: ViewContainerRef,
        private cmpFactoryResolver: ComponentFactoryResolver
    ) {
    }

    ngOnInit() {

    }

    ngAfterContentInit() {

        this.initColumns();
    }

    private initColumns() {

        let cmpFactory = this.cmpFactoryResolver.resolveComponentFactory(GridColumnComponent);
        this.columns = this.columnList.toArray();

        if (this.withRowNumber && this.withCheckbox) {

            let rowNumberCmpRef = this.vcRef.createComponent(cmpFactory);
            let checkboxCmpRef = this.vcRef.createComponent(cmpFactory);

            rowNumberCmpRef.instance.isRowNumber = true;
            checkboxCmpRef.instance.isCheckbox = true;

            this.columns.unshift(rowNumberCmpRef.instance);
            this.columns.unshift(checkboxCmpRef.instance);

        } else if (this.withRowNumber) {

            let cmpRef = this.vcRef.createComponent(cmpFactory);

            cmpRef.instance.isRowNumber = true;

            this.columns.unshift(cmpRef.instance);
        } else if (this.withCheckbox) {

            let cmpRef = this.vcRef.createComponent(cmpFactory);

            cmpRef.instance.isCheckbox = true;

            this.columns.unshift(cmpRef.instance);
        }
    }

    private getColumnModel(column: GridColumnComponent): string {

        if (column.isCheckbox) return 'checkbox';

        if (column.isRowNumber) return 'row-number';

        if (column.tplRef) return 'template';

        return 'text';
    }

    private handleClickHeadCheckbox(isChecked: boolean) {

        if (isChecked) {
            this.store.forEach((item) => {
                item.checked = true;
            });
        } else {
            this.store.forEach((item) => {
                item.checked = false;
            });
        }
    }

    private handleClickRowCheckbox(isChecked: boolean, record: any) {

        record.checked = isChecked;

        this.checkIsSelectAll();
    }

    private checkIsSelectAll() {
        let count = 0;

        this.store.forEach((item) => {
            if (item.checked) {
                count++;
            }
        });

        this.isSelectAll = this.store.length === count;
    }

    showLoading() {
        this.loading.show();
    }

    hideLoading() {
        this.loading.hide();
    }
}

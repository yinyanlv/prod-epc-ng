import {Component, Input, ContentChildren, QueryList, ComponentFactoryResolver, ViewContainerRef, OnInit, AfterContentInit} from '@angular/core';

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
    withCheckbox: boolean = false;

    @Input()
    checkboxModel: string = 'multiple';  // single | multiple

    @Input()
    store: Array<any>;

    @ContentChildren(GridColumnComponent)
    columnList: QueryList<GridColumnComponent>;

    columns: Array<GridColumnComponent>;

    isSelectAll: boolean = false;

    constructor(
        private vcRef: ViewContainerRef,
        private cmpFactoryResolver: ComponentFactoryResolver
    ) {
    }

    ngOnInit() {
    }

    ngAfterContentInit() {

        if (this.withCheckbox) {

            let cmpFactory = this.cmpFactoryResolver.resolveComponentFactory(GridColumnComponent);
            let cmpRef = this.vcRef.createComponent(cmpFactory);

            cmpRef.instance.isCheckbox = true;
            this.columns = this.columnList.toArray();

            if (this.columns) {
                this.columns.unshift(cmpRef.instance);
            }
        } else {

            this.columns = this.columnList.toArray();
        }
    }

    getColumnModel(column: GridColumnComponent): string {

        if (column.tplRef) return 'template';

        if (column.isCheckbox) return 'checkbox';

        return 'text';
    }

    handleClickHeadCheckbox(isChecked: boolean) {

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

    handleClickRowCheckbox(isChecked: boolean, record: any) {

        record.checked = isChecked;

        this.checkIsSelectAll();
    }

    checkIsSelectAll() {
        let count = 0;

        this.store.forEach((item) => {
            if (item.checked) {
                count++;
            }
        });

        this.isSelectAll = this.store.length === count;
    }
}

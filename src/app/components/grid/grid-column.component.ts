import {Component, Input, ContentChild, OnInit, TemplateRef} from '@angular/core';

@Component({
    selector: 's-grid-column',
    template: `<ng-content></ng-content>`
})
export class GridColumnComponent implements OnInit {

    isCheckbox: boolean = false;

    isRowNumber: boolean = false;

    @Input()
    index: string;

    @Input()
    title: string;

    @Input()
    width: string = 'auto';

    @ContentChild('tdContent')
    tplRef: TemplateRef<any>;

    ngOnInit() {

    }
}

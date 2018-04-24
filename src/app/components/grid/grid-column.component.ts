import {Component, Input, ContentChild, OnInit, TemplateRef} from '@angular/core';

@Component({
    selector: 's-grid-column',
    template: `<ng-content></ng-content>`
})
export class GridColumnComponent implements OnInit {

    isCheckbox: boolean = false;

    @Input()
    code: string;

    @Input()
    label: string;

    @ContentChild('tdContent')
    tplRef: TemplateRef<any>;

    ngOnInit() {

    }
}

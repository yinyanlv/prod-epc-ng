import {Component, Input, ContentChild, ViewChild, OnInit, ElementRef} from '@angular/core';

@Component({
    selector: 's-grid-column',
    template: `<ng-container #container><ng-content></ng-content></ng-container>`
})
export class GridColumnComponent implements OnInit {

    @Input()
    label: string;

    @ViewChild('container')
    container: ElementRef;

    html: string;

    ngOnInit() {

        this.html = this.container.nativeElement.parentElement.innerHTML;
    }
}

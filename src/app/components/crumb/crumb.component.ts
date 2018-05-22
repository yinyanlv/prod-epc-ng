import {Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';

export interface CrumbModel {
    code: string;
    text: string;
    url: string;
    queryParams?: any;
}

@Component({
    selector: 's-crumb',
    templateUrl: './crumb.html',
    styleUrls: ['./crumb.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrumbComponent implements OnInit {

    @Input()
    list: Array<CrumbModel>;

    @Output()
    onClickItem: EventEmitter<any> = new EventEmitter<any>();

    ngOnInit() {
    }
}

import {Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector: 's-crumb',
    templateUrl: './crumb.html',
    styleUrls: ['./crumb.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrumbComponent implements OnInit {

    @Input()
    list: Array<any>;

    @Output()
    onClickItem: EventEmitter<any> = new EventEmitter<any>();

    ngOnInit() {
    }
}

import {Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-crumb',
    templateUrl: './crumb.html',
    styleUrls: ['./crumb.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrumbComponent implements OnInit {

    @Input()
    list: Array<any>;

    ngOnInit() {

    }
}

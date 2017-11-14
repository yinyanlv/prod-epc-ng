import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit} from '@angular/core';

@Component({
    selector: 'condition',
    templateUrl: 'condition.html',
    styleUrls: ['condition.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConditionComponent implements OnInit {

    private _list: Array<any>;

    @Input() withAll: boolean = true;
    @Input() isCollapsed: boolean = true;
    @Input() title: boolean = true;
    @Input() activeItem: {code: string; name: string;};
    @Input()
    set list(val) {

        this.withAll ? this._list = [{code: '', name: '全部'}, ...val] : this._list = val;
    }
    get list() {
        return this._list;
    };

    @Output()
    private selectItem = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit() {
    }

    select(item) {

        this.activeItem = item;
        this.selectItem.emit(this.activeItem);
    }

    toggle() {

        this.isCollapsed = !this.isCollapsed;
    }
}

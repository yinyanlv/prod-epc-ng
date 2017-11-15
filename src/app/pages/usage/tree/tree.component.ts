import {Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';

export interface TreeModel {
    code: string;
    name: string;
    isExpanded: boolean;
    children?: Array<TreeModel>;
}

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'tree',
    templateUrl: './tree.html',
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeComponent {

    @Input()
    list: Array<TreeModel>;

    @Input()
    activeItemCode: string;

    selectItem(item: TreeModel) {

        this.activeItemCode = item.code;
    }

    toggle(item: TreeModel) {

        item.isExpanded = !item.isExpanded;
    }
}

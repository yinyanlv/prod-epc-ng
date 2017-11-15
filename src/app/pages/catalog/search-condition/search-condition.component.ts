import {Component, ViewEncapsulation, Input, Output, ChangeDetectionStrategy} from '@angular/core';

import {BaseComponent} from '../../../base/base-component';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'search-condition',
    templateUrl: './search-condition.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchConditionComponent extends BaseComponent {

    @Input() isShowConditions: boolean = true;
}

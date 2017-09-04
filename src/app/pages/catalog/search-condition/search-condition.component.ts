import {Component, ViewEncapsulation, OnInit} from '@angular/core';

import {BaseComponent} from '../../../base/base-component';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'search-condition',
    templateUrl: './search-condition.html',
    styleUrls: ['./search-condition.scss']
})
export class SearchConditionComponent extends BaseComponent implements OnInit {

    ngOnInit() {

    }
}

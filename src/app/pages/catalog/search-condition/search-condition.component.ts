import {Component, ViewEncapsulation, OnInit} from '@angular/core';

import {BaseComponent} from '../../../base/base-component';
import {SearchConditionService} from './search-condition.service';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'search-condition',
    templateUrl: './search-condition.html',
    styleUrls: ['./search-condition.scss'],
    providers: [SearchConditionService]
})
export class SearchConditionComponent extends BaseComponent implements OnInit {

    isShowConditions: boolean = true;
    list1: Array<any>;
    list2: Array<any>;
    list3: Array<any>;
    isCollapsed1: boolean = true;
    isCollapsed2: boolean = true;
    isCollapsed3: boolean = true;

    constructor(private searchConditionService: SearchConditionService) {

        super();
    }

    ngOnInit() {

    }

    toggleList(list: string, isCollapse: boolean) {

        switch (list) {
            case 'list1':
                isCollapse ? this.isCollapsed1 = true : this.isCollapsed1 = false;
                break;
            case 'list2':
                isCollapse ? this.isCollapsed2 = true : this.isCollapsed2 = false;
                break;
            case 'list3':
                isCollapse ? this.isCollapsed3 = true : this.isCollapsed3 = false;
                break;
        }
    }
}

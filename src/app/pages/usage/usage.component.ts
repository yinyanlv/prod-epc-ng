import {Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';

import {TreeModel} from './tree/tree.component';
import {UsageService} from './usage.service';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-usage',
    templateUrl: './usage.html',
    styleUrls: ['./usage.scss'],
    providers: [UsageService]
})
export class UsageComponent implements OnInit {

    @ViewChild('legend')
    legend;

    treeList: Array<TreeModel>;

    constructor(private service: UsageService) {
    }

    ngOnInit() {

        this.treeList = this.service.getGroupList();
    }
}

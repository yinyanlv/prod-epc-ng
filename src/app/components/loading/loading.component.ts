import {Component, Input, OnInit} from '@angular/core';

import {fadeAnimation} from '../../animations/fade.animation';

@Component({
    selector: 's-loading',
    templateUrl: './loading.html',
    styleUrls: ['./loading.scss'],
    animations: [fadeAnimation]
})
export class LoadingComponent implements OnInit {

    @Input()
    text: string = '正在加载...';

    ngOnInit() {

    }
}

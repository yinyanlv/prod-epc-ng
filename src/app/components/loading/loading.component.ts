import {Component, Input, OnInit, HostBinding} from '@angular/core';

import {fadeAnimation} from '../../animations/fade.animation';

@Component({
    selector: 's-loading',
    templateUrl: './loading.html',
    styleUrls: ['./loading.scss'],
    animations: [fadeAnimation]
})
export class LoadingComponent implements OnInit {

    @HostBinding('@fade')  // fix: 对于动态创建的component，调用destroy方法，:leave animation不触发。:leave，只能在host元素上触发

    @Input()
    text: string = '正在加载...';

    ngOnInit() {
    }
}

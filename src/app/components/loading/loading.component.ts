import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 's-loading',
    templateUrl: './loading.html',
    styleUrls: ['./loading.scss']
})
export class LoadingComponent implements OnInit {

    @Input()
    private text: string = '正在加载...';

    private visible: boolean = false;

    ngOnInit() {

    }
}

import {Component, Input, ElementRef, Renderer2, OnInit} from '@angular/core';

@Component({
    selector: 's-loading',
    templateUrl: './loading.html',
    styleUrls: ['./loading.scss']
})
export class LoadingComponent implements OnInit {

    @Input()
    private text: string = '正在加载...';

    private visible: boolean = false;

    constructor(
        private elem: ElementRef,
        private renderer: Renderer2
    ) {
    }

    ngOnInit() {

    }
}

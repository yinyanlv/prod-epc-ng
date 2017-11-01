import {Component, ViewEncapsulation, OnInit} from '@angular/core';

import {SubjectService} from '../../services/subject.service';
import {eventMap} from '../../etc/provider';
import {fadeAnimation} from '../../animations/fade.animation';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-dialog',
    templateUrl: './dialog.html',
    styleUrls: ['./dialog.scss'],
    animations: [fadeAnimation]
})
export class DialogComponent implements OnInit{

    isShow: boolean = false;
    content: string;
    fadeState: string;
    private confirmHandler: Function;
    private cancelHandler: Function;

    constructor(
        private subjectService: SubjectService
    ) {
    }

    ngOnInit() {
        this.subjectService.subscribe(eventMap.showDialog, (opts) => {

            this.content = opts.content;
            this.confirmHandler = opts.onConfirm;
            this.cancelHandler = opts.onCancel;

            this.isShow = true;
            this.fadeState = 'in';
        })
    }

    confirm() {

        this.confirmHandler && this.confirmHandler();
        this.isShow = false;
        this.fadeState = 'out';
    }

    cancel() {

        this.cancelHandler && this.cancelHandler();
        this.isShow = false;
        this.fadeState = 'out';
    }
}

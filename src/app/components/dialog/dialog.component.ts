import {Component, ViewEncapsulation, OnInit} from '@angular/core';

import {SubjectService} from '../../services/subject.service';
import {eventMap} from '../../etc/provider';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-dialog',
    templateUrl: './dialog.html',
    styleUrls: ['./dialog.scss']
})
export class DialogComponent implements OnInit{

    isShow: boolean = false;
    content: string;
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
        })
    }

    confirm() {

        this.confirmHandler && this.confirmHandler();
        this.isShow = false;
    }

    cancel() {

        this.cancelHandler && this.cancelHandler();
        this.isShow = false;
    }
}

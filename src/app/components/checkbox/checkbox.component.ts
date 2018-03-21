import {Component, OnInit} from '@angular/core';

@Component({
    selector: 's-checkbox',
    templateUrl: 'checkbox.html',
    styleUrls: ['checkbox.scss']
})
export class CheckboxComponent implements OnInit {

    checked: boolean;

    constructor() {
    }

    ngOnInit() {
    }

    toggleStatus(e) {

        this.checked = !this.checked;
        console.log(e);
    }
}

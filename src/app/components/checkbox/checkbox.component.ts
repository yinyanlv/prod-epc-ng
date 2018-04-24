import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 's-checkbox',
    templateUrl: 'checkbox.html',
    styleUrls: ['checkbox.scss']
})
export class CheckboxComponent implements OnInit {

    @Input()
    checked: boolean = false;

    @Output()
    statusChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    ngOnInit() {
    }

    toggleStatus() {

        this.checked = !this.checked;
        this.statusChange.emit(this.checked);
    }
}

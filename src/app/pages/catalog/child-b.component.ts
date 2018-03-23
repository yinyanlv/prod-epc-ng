import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector: 'child-b',
    template: `
        <div>
        {{value}}
        -------------
        <ng-content></ng-content>
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildBComponent {

    @Input()
    value: String = 'child b';

    constructor() {
        console.log('child b constructor');
    }

    ngOnChanges() {
        console.log('------------------------------');
        console.log('child b ngOnChanges');
    }

    ngOnInit() {
        console.log('child b ngOnInit');

        setTimeout(() => {
            this.value = 'e33333333';
        }, 10000);
    }

    ngDoCheck() {
        console.log('child b ngDoCheck');
    }

    ngAfterContentInit() {
        console.log('child b ngAfterContentInit');
    }

    ngAfterContentChecked() {
        console.log('child b ngAfterContentChecked');
    }

    ngAfterViewInit() {
        console.log('child b ngAfterViewInit');
    }

    ngAfterViewChecked() {
        console.log('child b ngAfterViewChecked');
    }

    ngOnDestroy() {
        console.log('child b ngOnDestroy');
    }
}

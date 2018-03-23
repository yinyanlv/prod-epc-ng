import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector: 'child-a',
    template: `
        <div>
        {{value}}
        -------------
        <ng-content></ng-content>
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildAComponent {

    @Input()
    value: String = 'child a';

    constructor() {
        console.log('child a constructor');
    }

    ngOnChanges() {
        console.log('child a ngOnChanges');
    }

    ngOnInit() {
        console.log('child a ngOnInit');

        setTimeout(() => {
            this.value = '33333333333';
        }, 10000);
    }

    ngDoCheck() {
        console.log('child a ngDoCheck');
    }

    ngAfterContentInit() {
        console.log('child a ngAfterContentInit');
    }

    ngAfterContentChecked() {
        console.log('child a ngAfterContentChecked');
    }

    ngAfterViewInit() {
        console.log('child a ngAfterViewInit');
    }

    ngAfterViewChecked() {
        console.log('child a ngAfterViewChecked');
    }

    ngOnDestroy() {
        console.log('child a ngOnDestroy');
    }
}

import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector: 'parent',
    template: `
        <div>
        {{value}}
        -------------
        <ng-content></ng-content>
</div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParentComponent {

    @Input()
    value: String = 'parent';

    constructor() {
        console.log('parent constructor');
    }

    ngOnChanges() {
        console.log('parent ngOnChanges');
    }

    ngOnInit() {
        console.log('parent ngOnInit');
    }

    ngDoCheck() {
        console.log('parent ngDoCheck');
    }

    ngAfterContentInit() {
        console.log('parent ngAfterContentInit');
    }

    ngAfterContentChecked() {
        console.log('parent ngAfterContentChecked');
    }

    ngAfterViewInit() {
        console.log('parent ngAfterViewInit');
    }

    ngAfterViewChecked() {
        console.log('parent ngAfterViewChecked');
    }

    ngOnDestroy() {
        console.log('parent ngOnDestroy');
    }
}

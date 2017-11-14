import {Component, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-footer',
    templateUrl: './footer.html',
    styleUrls: ['./footer.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {}

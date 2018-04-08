import {trigger, animate, style, transition, AnimationTriggerMetadata} from '@angular/animations';

export const fadeAnimation: AnimationTriggerMetadata = trigger('fade', [
    transition(':enter', [style({opacity: 0}), animate('200ms ease-in', style({opacity: 1}))]),
    transition(':leave', [style({opacity: 1}), animate('200ms ease-out', style({opacity: 0}))]),
]);

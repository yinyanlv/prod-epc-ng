import {trigger, animate, state, style, transition, AnimationTriggerMetadata} from '@angular/animations';

export const fadeAnimation: AnimationTriggerMetadata = trigger('fade', [
    state('void', style({opacity: 0, transform: "translateY(-100%)"})),
    state('in', style({opacity: 1, transform: "translateY(0)"})),
    state('out', style({opacity: 0, transform: "translateY(-100%)"})),
    transition('void => *', animate('150ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
    transition('* => void', animate('150ms cubic-bezier(0.4, 0.0, 1, 1)'))
]);

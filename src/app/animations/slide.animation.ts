import {trigger, style, animate, state, transition, AnimationTriggerMetadata} from '@angular/animations';

export const slideAnimation: AnimationTriggerMetadata = trigger('slide', [
    state('up', style({height: 0})),
    state('down', style({height: '*'})),
    transition('up => down', [
        animate('300ms ease-in')
    ]),
    transition('down => up', [
        animate('300ms ease-out')
    ])
]);

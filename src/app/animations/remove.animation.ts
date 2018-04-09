import {trigger, AnimationTriggerMetadata, transition, style, animate} from '@angular/animations';

export const removeAnimation: AnimationTriggerMetadata = trigger('remove', [
    transition(':leave', [
        style({opacity: 1}),
        animate('300ms ease-out', style({
        transform: 'translate(100px, 0)',
        opacity: 0
    }))])
]);

import {trigger, AnimationTriggerMetadata, transition, query, style, animate, animateChild, stagger} from '@angular/animations';

export const runChildrenAnimation: AnimationTriggerMetadata = trigger('removeChildren', [
    transition(':leave', [
        query('@*', [stagger(200, [animateChild()])], {optional: true})
    ])
]);

export const removeAnimation: AnimationTriggerMetadata = trigger('remove', [
    transition(':leave', [
        style({opacity: 1}),
        animate('300ms ease-out', style({
            transform: 'translate(100px, 0)',
            opacity: 0
        }))
    ])
]);


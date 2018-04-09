import {trigger, AnimationTriggerMetadata, transition, query, animateChild, stagger} from '@angular/animations';

export const runChildrenAnimation: AnimationTriggerMetadata = trigger('runChildren', [
    transition(':leave', [
        query('@*', animateChild(), {optional: true})
    ])
]);

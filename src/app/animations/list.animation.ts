import {trigger, AnimationTriggerMetadata, transition, query, stagger, animate, style} from '@angular/animations';

export const listAnimation: AnimationTriggerMetadata = trigger('list', [

    transition('* => *', [
        query(':enter', [
                style({transform: 'translate(100px, 0)', opacity: 0}),
                stagger(200, [
                    animate('200ms ease-in', style({
                        transform: 'translate(0, 0)',
                        opacity: 1
                    }))
                ])
            ],
            {optional: true}
        ),

        query(':leave', [
                style({transform: 'translate(0, 0)', opacity: 1}),
                stagger(200, [
                    animate('200ms ease-out', style({
                        transform: 'translate(100px, 0)',
                        opacity: 0
                    }))
                ])
            ],
            {optional: true}
        )
    ])
]);

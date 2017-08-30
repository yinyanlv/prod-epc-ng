import {NgModule} from '@angular/core';

import {ResHostPipe} from '../pipes/res-host.pipe';
import {BackgroundUrlPipe} from '../pipes/background-url.pipe';

const pipes = [
    ResHostPipe,
    BackgroundUrlPipe
];

@NgModule({
    declarations: [
        ...pipes
    ],
    exports: [
        ...pipes
    ]
})
export class SharedPipesModule {
}

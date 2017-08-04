import {Injectable} from '@angular/core';

import {StateService} from './state.service';

@Injectable()
export class TransService {

    constructor(
        private stateService: StateService
    ) {

        return window['trans'][this.stateService.getLanguage()];
    }
}

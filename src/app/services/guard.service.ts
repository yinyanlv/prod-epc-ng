import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';

import {StateService} from './state.service';

@Injectable()
export class LoginGuardService implements CanActivate {

    constructor(
        private router: Router,
        private stateService: StateService
    ) {
    }

    canActivate(): boolean {

        return true;
    }
}

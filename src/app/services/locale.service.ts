import { Injectable } from '@angular/core';

@Injectable()
export class LocaleService{

    constructor() {

        return window['trans'];
    }

}

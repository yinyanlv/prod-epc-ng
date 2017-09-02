import {Injectable} from '@angular/core';

const EVENT_MAP: any = {
    showDialog: 'dialog:show'
};

@Injectable()
export class EventMapService {

    constructor() {

        return EVENT_MAP;
    }
}

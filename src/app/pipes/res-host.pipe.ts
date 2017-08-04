import {Pipe, PipeTransform} from '@angular/core';

import {GlobalConfigService} from '../services/global-config.service';

@Pipe({
    name: 'resHost'
})
export class ResHostPipe implements PipeTransform {

    constructor(private globalConfigService: GlobalConfigService) {
    }

    transform(src: string) {

        return this.globalConfigService.get('resHost') + '/' + src;
    }
}

import {Pipe, PipeTransform, Inject} from '@angular/core';

import {GlobalConfigService} from '../services/global-config.service';

@Pipe({
    name: 'resHost'
})
export class ResHostPipe implements PipeTransform {

    constructor(@Inject(GlobalConfigService) private globalConfig) {
    }

    transform(src: string) {

        return this.globalConfig.resHost + '/' + src;
    }
}

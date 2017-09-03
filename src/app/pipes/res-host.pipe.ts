import {Pipe, PipeTransform} from '@angular/core';

import {globalConfig} from '../etc/provider';

@Pipe({
    name: 'resHost'
})
export class ResHostPipe implements PipeTransform {

    transform(src: string) {

        return globalConfig.resHost + '/' + src;
    }
}

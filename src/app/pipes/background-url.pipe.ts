import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
    name: 'backgroundUrl'
})
export class BackgroundUrlPipe implements PipeTransform {

    constructor(private domSanitizer: DomSanitizer) {
    }

    transform(src: string) {

        return this.domSanitizer.bypassSecurityTrustStyle('url(' + src + ')');
    }
}

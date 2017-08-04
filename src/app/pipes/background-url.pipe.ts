import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
    name: 'backgroundUrl'
})
export class BackgroundUrlPipe implements PipeTransform {

    constructor(private sanitizer: DomSanitizer) {
    }

    transform(src: string) {

        console.log(1111111);
        return this.sanitizer.bypassSecurityTrustStyle('url(' + src + ')');
    }
}

import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {GlobalConfigService} from '../services/global-config.service';

@Pipe({
  name: 'backgroundSrc'
})
export class ImgSrcPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer, private globalConfigService: GlobalConfigService) {
  }

  transform(src: string) {

    src = this.globalConfigService.get('path') + src;
    return this.sanitizer.bypassSecurityTrustStyle('url(' + src + ')');
  }
}

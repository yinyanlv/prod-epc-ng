import { Pipe, PipeTransform } from '@angular/core';
import { GlobalConfigService } from '../services/global-config.service';

/**
 * @param src:用户路径
 * @param pathparams:{
 *        path:'path'   根路径(path/resHost)
 *        (var..format):  替换用户路径中变量值
 * }
 */

@Pipe({
    name: 'rootpath'
})
export class AppendRootPathPipe implements PipeTransform {

    constructor(private globalConfigService: GlobalConfigService) { }

    transform(src: string, pathparams: any) {

        let url="";
        if (typeof pathparams =="object"){
            try {
                let subCode = src.match("\{(.*[^\}])\}");

                src = src.replace(subCode[0], pathparams[subCode[1]]);
            }catch(error){
                throw new Error(error.message);
            }

            if (!pathparams.path || pathparams.path == "path") {
                url = this.globalConfigService['path'] + src;
            }
            else {
                url = this.globalConfigService['resHost'] + src;
            }
        }else{
            url = this.globalConfigService[pathparams] + src;
        }

        return url;
    }
}

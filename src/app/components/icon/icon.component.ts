import {Component, Renderer2, Input} from '@angular/core';

@Component({
  selector: 's-icon',
  templateUrl: './icon.html',
  styleUrls: ['./icon.scss']
})
export class IconComponent {

  // 图标样式前缀
  @Input()
  prefix: string = 'iconfont icon-';

  // 图标类型
  @Input()
  type: string;
}

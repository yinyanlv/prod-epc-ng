import { Component, Renderer2, Input } from '@angular/core';

@Component({
	selector: 's-icon',
	templateUrl: './icon.html',
	styleUrls: ['./icon.scss']
})
export class IconComponent {

	// 图标类型
	@Input()
	private type: string;

	// 图标大小 , 默认:12px
	private iconSize: string = "12px";

	// 图标颜色, 默认:#333333
	@Input('color')
	private iconColor: string = "#333333";

	// 设置图标大小属性
	@Input('size')
	public set size(value: any) {
		if (isNaN(value)) {
			this.iconSize = value
		} else {
			this.iconSize = value + 'px';
		}
	}
}
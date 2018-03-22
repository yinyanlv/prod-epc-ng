import {Directive, Input, ElementRef, Renderer2, OnInit} from '@angular/core';

@Directive({
    selector: '[s-loading]'
})
export class LoadingComponent implements OnInit {

    @Input()
    private text: string = '正在加载...';

    private visible: boolean = false;
    private loadingElement: Element;

    constructor(
        private elem: ElementRef,
        private renderer: Renderer2
    ) {
    }

    ngOnInit() {

        let hostElement = this.elem.nativeElement;
        let tempElement: HTMLElement = this.renderer.createElement('div');

        tempElement.innerHTML = this.getLoadingHtml();

        this.loadingElement = tempElement.children[0];

        this.renderer.setStyle(hostElement, 'position', 'relative');
        this.renderer.appendChild(hostElement, this.loadingElement);
    }

    getLoadingHtml(): string {

        return `
            <div class="loading">
                <span class="icon"><i></i><i></i><i></i><i></i></span>
                <span class="text">${this.text}</span>
            </div>
        `;
    }
}

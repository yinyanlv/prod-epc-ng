import {Directive, Input, ElementRef, Renderer2, OnInit} from '@angular/core';

@Directive({
    selector: '[insertNodes]'
})
export class InsertNodesDirective implements OnInit {

    private hostElement: HTMLElement;

    @Input('insertNodes')
    private nodes: NodeList;

    constructor(
        private elemRef: ElementRef,
        private renderer: Renderer2
    ) {
    }

    ngOnInit() {

        this.hostElement = this.elemRef.nativeElement;

        Array.prototype.slice.call(this.nodes).forEach((node) => {
            this.renderer.appendChild(this.hostElement, node);
        });
    }
}

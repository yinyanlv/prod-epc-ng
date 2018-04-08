import {Directive, ViewContainerRef, Input, Output, ComponentRef, ElementRef, ComponentFactoryResolver, Renderer2, OnInit} from '@angular/core';

import {LoadingComponent} from '../components/loading/loading.component';

@Directive({
    selector: '[loading]'
})
export class LoadingDirective implements OnInit{

    private hostElement: HTMLElement;
    private hasShown: boolean = false;
    private cmpRef: ComponentRef<LoadingComponent>;

    @Input()
    private autoShow: boolean = true;

    constructor(
        private vcRef: ViewContainerRef,
        private elemRef: ElementRef,
        private cmpFactoryResolver: ComponentFactoryResolver,
        private renderer: Renderer2
    ) {
    }

    ngOnInit() {

        if (this.autoShow) {
            this.show();
        }
    }

    show() {

        this.hostElement = this.elemRef.nativeElement;
        let defaultPositionStyle = window.getComputedStyle(this.hostElement).position;

        if (defaultPositionStyle === 'static') {
            this.renderer.setStyle(this.hostElement, 'position', 'relative');
        }

        let cmpFactory = this.cmpFactoryResolver.resolveComponentFactory(LoadingComponent);

        this.cmpRef = this.vcRef.createComponent(cmpFactory);

        this.renderer.appendChild(this.hostElement, this.cmpRef.location.nativeElement);
        this.hasShown = true;
    }

    hide() {

        this.renderer.removeChild(this.hostElement, this.cmpRef.location.nativeElement);
        this.hasShown = false;
    }
}

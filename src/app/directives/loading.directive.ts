import {Directive, ViewContainerRef, Injector, ViewChild, ElementRef, ComponentFactoryResolver, Renderer2, OnInit} from '@angular/core';

import {LoadingComponent} from '../components/loading/loading.component';

@Directive({
    selector: '[loading]'
})
export class LoadingDirective implements OnInit{

    private hostElement: HTMLElement;

    constructor(
        private vcRef: ViewContainerRef,
        private elemRef: ElementRef,
        private cmpFactoryResolver: ComponentFactoryResolver,
        private renderer: Renderer2
    ) {
    }

    ngOnInit() {

        this.hostElement = this.elemRef.nativeElement;
        let defaultPositionStyle = window.getComputedStyle(this.hostElement).position;

        if (defaultPositionStyle === 'static') {
            this.renderer.setStyle(this.hostElement, 'position', 'relative');
        }

        let cmpFactory = this.cmpFactoryResolver.resolveComponentFactory(LoadingComponent);

        let cmpRef = this.vcRef.createComponent(cmpFactory);

        this.renderer.appendChild(this.hostElement, cmpRef.location.nativeElement);
    }
}

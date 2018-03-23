import {Directive, ViewContainerRef, ComponentRef, ViewChild, Injector, ElementRef, ComponentFactoryResolver, Renderer2, OnInit} from '@angular/core';

import {LoadingComponent} from '../components/loading/loading.component';

@Directive({
    selector: '[loading]'
})
export class LoadingDirective implements OnInit{

    private hostElement: HTMLElement;

    constructor(
        private viewContainer: ViewContainerRef,
        private elem: ElementRef,
        private cmpFactoryResolver: ComponentFactoryResolver,
        private renderer: Renderer2,
        private injector: Injector
    ) {
    }

    ngOnInit() {

        this.hostElement = this.elem.nativeElement;
        let defaultPositionStyle = window.getComputedStyle(this.hostElement).position;

        if (defaultPositionStyle === 'static') {
            this.renderer.setStyle(this.hostElement, 'position', 'relative');
        }

        let cmpFactory = this.cmpFactoryResolver.resolveComponentFactory(LoadingComponent);

        console.log(this.viewContainer);
        this.viewContainer.createComponent(cmpFactory, 0, this.injector)
    }
}

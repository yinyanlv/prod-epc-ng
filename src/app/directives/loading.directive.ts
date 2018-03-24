import {Directive, ViewContainerRef, Injector, ViewChild, ElementRef, ComponentFactoryResolver, Renderer2, OnInit} from '@angular/core';

import {LoadingComponent} from '../components/loading/loading.component';

@Directive({
    selector: '[loading]'
})
export class LoadingDirective implements OnInit{

    private hostElement: HTMLElement;

    @ViewChild('abc', {
        read: Injector
    })
    private a: Injector;

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

        console.log(this.viewContainer);
        console.log(this.injector);

        let cmpFactory = this.cmpFactoryResolver.resolveComponentFactory(LoadingComponent);
        let cmp = cmpFactory.create(this.injector);

        this.renderer.appendChild(this.hostElement, cmp.hostView['rootNodes'][0]);
    }
}

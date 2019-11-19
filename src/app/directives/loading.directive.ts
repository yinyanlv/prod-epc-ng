import {
  Directive,
  Input,
  ElementRef,
  ComponentRef,
  ViewContainerRef,
  ComponentFactoryResolver,
  Renderer2,
  OnInit,
  OnDestroy
} from '@angular/core';

import {LoadingComponent} from '../components/loading/loading.component';

@Directive({
  selector: '[loading]'
})
export class LoadingDirective implements OnInit, OnDestroy {

  private hostElement: HTMLElement;
  private hasShown: boolean = false;
  private cmpRef: ComponentRef<LoadingComponent>;

  @Input('loading')
  private autoShow: boolean = false;

  @Input()
  private loadingText: string;

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

    if (this.hasShown) {
      return;
    }

    this.hostElement = this.elemRef.nativeElement;
    let defaultPositionStyle = window.getComputedStyle(this.hostElement).position;

    if (defaultPositionStyle === 'static') {
      this.renderer.setStyle(this.hostElement, 'position', 'relative');
    }

    let cmpFactory = this.cmpFactoryResolver.resolveComponentFactory(LoadingComponent);

    this.cmpRef = this.vcRef.createComponent(cmpFactory);

    this.ngOnDestroy();

    if (this.loadingText) {
      this.cmpRef.instance.text = this.loadingText;
    }
    this.cmpRef.changeDetectorRef.detectChanges();
    this.renderer.appendChild(this.hostElement, this.cmpRef.location.nativeElement);
    this.hasShown = true;

  }

  hide() {

    if (!this.hasShown) {
      return;
    }

    this.cmpRef.destroy();
    this.hasShown = false;
  }

  ngOnDestroy() {

    if (this.cmpRef) {
      this.cmpRef.changeDetectorRef.detach();
    }
  }
}

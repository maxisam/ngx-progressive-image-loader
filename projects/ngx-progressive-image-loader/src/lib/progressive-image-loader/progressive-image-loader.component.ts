import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  QueryList,
  Renderer2,
} from '@angular/core';
import { WINDOW } from 'ngx-window-token';

import { ConfigurationService } from '../configuration.service';
import { ProgressiveImageDirective } from '../progressive-image/progressive-image.directive';
import { isSpider, isSupportIntersectionObserver, loadImage } from '../util';

@Component({
  selector: 'ngx-progressive-image-loader',
  template: `<ng-content></ng-content>`,
  styles: []
})
export class ProgressiveImageLoaderComponent implements OnInit, AfterContentInit, OnDestroy {
  // define the placeholder height for all images inside this components
  @Input()
  imageRatio: number;
  // to define how blur the loading image is
  @Input()
  blurFilter: number;
  @Input()
  filter: string;
  // the src of loading image
  @Input()
  placeHolderImageSrc: string;
  // get all ProgressiveImageDirective that might be wrapped in image placeholders
  @ContentChildren(ProgressiveImageDirective, { descendants: true })
  images: QueryList<ProgressiveImageDirective>;

  intersectionObserver: IntersectionObserver;

  constructor(
    element: ElementRef,
    public _Renderer: Renderer2,
    public _ConfigurationService: ConfigurationService,
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(WINDOW) private window: any
  ) {}

  ngOnInit() {
    if (isSupportIntersectionObserver(this.window) && !isSpider(this.window)) {
      if (!this.imageRatio) {
        this.imageRatio = this._ConfigurationService.config.imageRatio;
      }
      if (!this.blurFilter) {
        this.blurFilter = this._ConfigurationService.config.blurFilter;
      }
      if (!this.filter) {
        this.filter = this._ConfigurationService.config.filter;
      }
      if (!this.placeHolderImageSrc) {
        this.placeHolderImageSrc = this._ConfigurationService.config.placeHolderImage;
      }
      this.intersectionObserver = new IntersectionObserver(
        this.onIntersectionChanged.bind(this),
        this._ConfigurationService.config
      );
    }
  }

  ngAfterContentInit() {
    this.intersectionObserver && this.images.forEach(image => this.intersectionObserver.observe(image.imageElement));
  }

  onIntersectionChanged(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    entries.forEach(entry => entry.isIntersecting && this.onImageAppearsInViewport(entry.target, observer));
  }

  onImageAppearsInViewport(image: Element, observer: IntersectionObserver) {
    // Stop observing the current target
    observer.unobserve(image);
    loadImage(this._Renderer, image);
  }
  ngOnDestroy(): void {
    this.intersectionObserver && this.intersectionObserver.disconnect();
  }
}

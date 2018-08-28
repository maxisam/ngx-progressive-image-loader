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
  // the src of loading image
  @Input()
  placeHolderImageSrc: string;
  // get all ProgressiveImageDirective that might be wrapped in image placeholders
  @ContentChildren(ProgressiveImageDirective, { descendants: true })
  images: QueryList<ProgressiveImageDirective>;

  intersectionObserver: IntersectionObserver;

  constructor(
    element: ElementRef,
    public renderer: Renderer2,
    public _ConfigurationService: ConfigurationService,
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(WINDOW) private window: any
  ) {}

  ngOnInit() {
    if (
      'IntersectionObserver' in this.window &&
      'IntersectionObserverEntry' in this.window &&
      'intersectionRatio' in this.window.IntersectionObserverEntry.prototype
    ) {
      if (!this.imageRatio) {
        this.imageRatio = this._ConfigurationService.config.imageRatio;
      }
      if (!this.blurFilter) {
        this.blurFilter = this._ConfigurationService.config.blurFilter;
      }
      if (!this.placeHolderImageSrc) {
        this.placeHolderImageSrc = this._ConfigurationService.config.placeHolderImage;
      }
      this.intersectionObserver = new IntersectionObserver(
        this.onIntersectionChanged.bind(this),
        this._ConfigurationService.config
      );
    } else {
      throw new Error(
        'Require IntersectionObserver support from browser or polyfill. https://github.com/w3c/IntersectionObserver '
      );
    }
  }

  ngAfterContentInit() {
    this.images.forEach(image => this.intersectionObserver.observe(image.imageElement));
  }

  onIntersectionChanged(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    entries.forEach(entry => entry.isIntersecting && this.onImageAppearsInViewport(entry.target, observer));
  }

  onImageAppearsInViewport(image: Element, observer: IntersectionObserver) {
    // Stop observing the current target
    observer.unobserve(image);
    if (image instanceof HTMLImageElement) {
      if (image.dataset.src) {
        this.renderer.setAttribute(image, 'src', image.dataset.src);
        this.renderer.removeAttribute(image, 'data-src');
      }
    }

    // if (image.dataset.srcset) {
    //   this.renderer.setAttribute(image, 'srcset', image.dataset.srcset);
    //   this.renderer.removeAttribute(image, 'data-srcset');
    // }

    // if (image.dataset.backgroundSrc) {
    //   this.renderer.setStyle(image, 'background-image', `url(${image.dataset.backgroundSrc})`);
    //   this.renderer.removeAttribute(image, 'data-background-src');
    // }
  }
  ngOnDestroy(): void {
    this.intersectionObserver.disconnect();
  }
}

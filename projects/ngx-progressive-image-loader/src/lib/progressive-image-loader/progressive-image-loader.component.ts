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
  @Input()
  imageRatio = 16 / 9;

  @Input()
  blurFilter = 0;

  @Input()
  placeHolderImage =
    // tslint:disable-next-line:max-line-length
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICA8cGF0aCBmaWxsPSIjZGQwMDMxIiBkPSJNMTI1IDMwTDMxLjkgNjMuMmwxNC4yIDEyMy4xTDEyNSAyMzBsNzguOS00My43IDE0LjItMTIzLjF6Ii8+CiAgPHBhdGggZmlsbD0iI2MzMDAyZiIgZD0iTTEyNSAzMHYyMi4yLS4xVjIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMUwxMjUgMzB6Ii8+CiAgPHBhdGggZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiBmaWxsPSIjZmZmIi8+Cjwvc3ZnPgo=';

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

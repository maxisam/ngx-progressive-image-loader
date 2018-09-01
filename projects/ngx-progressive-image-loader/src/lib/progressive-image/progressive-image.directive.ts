import { Directive, ElementRef, Inject, Injector, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { WINDOW } from 'ngx-window-token';

import { ProgressiveImageLoaderComponent } from '../progressive-image-loader/progressive-image-loader.component';
import { isSpider, isSupportIntersectionObserver, loadImage } from '../util';

@Directive({
  // make sure the element is an image element
  selector: 'img[ngxProgressiveImage], source[ngxProgressiveImage]'
})
export class ProgressiveImageDirective implements OnInit, OnChanges {
  @Input()
  src: string;
  // tslint:disable-next-line:no-input-rename
  @Input()
  srcset: string;
  imageElement: HTMLImageElement;
  isObserve = false;
  ProgressiveImageLoader: ProgressiveImageLoaderComponent;
  constructor(
    private _ElementRef: ElementRef,
    public _Renderer: Renderer2,
    @Inject(WINDOW) private window: any,
    private _Injector: Injector
  ) {}
  ngOnInit(): void {
    this.imageElement = this._ElementRef.nativeElement;
    // only image element need to be observe and have onload event
    if (isSupportIntersectionObserver(this.window) && !isSpider(this.window)) {
      this.isObserve = true;
      if (this.imageElement instanceof HTMLImageElement) {
        this.imageElement.onload = () => {
          this.imageElement.classList.add('loaded');
        };
      }
    } else {
      // show image directly
      loadImage(this._Renderer, this.imageElement);
    }
    this.setDataSrc('data-src', this.src);
    this.setDataSrc('data-srcset', this.srcset);

    this.ProgressiveImageLoader = this._Injector.get(ProgressiveImageLoaderComponent);
    this.isObserve && this.ProgressiveImageLoader.intersectionObserver.observe(this.imageElement);
  }
  ngOnChanges(changes: SimpleChanges): void {
    changes.src && !changes.src.isFirstChange() && this.setDataSrc('data-src', this.src);
    changes.srcset && !changes.srcset.isFirstChange() && this.setDataSrc('data-srcset', this.srcset);

    if (
      this.isObserve &&
      ((changes.src && !changes.src.isFirstChange()) || (changes.srcset && !changes.srcset.isFirstChange()))
    ) {
      this.ProgressiveImageLoader.intersectionObserver.unobserve(this.imageElement);
      this.ProgressiveImageLoader.intersectionObserver.observe(this.imageElement);
    }
  }
  setDataSrc(attr: string, value: string) {
    value && this._Renderer.setAttribute(this.imageElement, attr, value);
  }
}

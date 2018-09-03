import { Directive, ElementRef, Inject, Injector, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { WINDOW } from 'ngx-window-token';

import { ConfigurationService } from '../configuration.service';
import { ProgressiveImageLoaderComponent } from '../progressive-image-loader/progressive-image-loader.component';
import { isPictureElement, isSpider, isSupportIntersectionObserver, loadImage } from '../util';

@Directive({
  // make sure the element is an image element
  selector: 'img[ngxProgressiveImage], source[ngxProgressiveImage]'
})
export class ProgressiveImageDirective implements OnInit, OnChanges {
  _imageRatio: number;
  // to create a placeholder before finish loading the real image to avoid reflow
  @Input()
  set imageRatio(value: number) {
    this._imageRatio = value;
  }
  get imageRatio() {
    return this._imageRatio || this.ProgressiveImageLoader.imageRatio;
  }

  // a loading image showing before the real image is loaded
  _placeholderImageSrc: string;
  @Input()
  set placeholderImageSrc(value: string) {
    this._placeholderImageSrc = value;
  }

  get placeholderImageSrc(): string {
    return this._placeholderImageSrc || this.ProgressiveImageLoader.placeHolderImageSrc;
  }

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
    private _Injector: Injector,
    public _ConfigurationService: ConfigurationService
  ) {}
  ngOnInit(): void {
    this.imageElement = this._ElementRef.nativeElement;
    if (isSupportIntersectionObserver(this.window) && !isSpider(this.window)) {
      // only image element need to be observe and have onload event
      if (this.imageElement instanceof HTMLImageElement) {
        this.isObserve = true;
        this.ProgressiveImageLoader = this._Injector.get(ProgressiveImageLoaderComponent);
        this.ProgressiveImageLoader.intersectionObserver.observe(this.imageElement);

        this.imageElement.onload = () => {
          this.imageElement.classList.add('loaded');
        };
        this.setPlaceholder();
      }
    } else {
      // show image directly
      loadImage(this._Renderer, this.imageElement);
    }
    this.setDataSrc('data-src', this.src);
    this.setDataSrc('data-srcset', this.srcset);
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

  setPlaceholder() {
    const parentElement = this.imageElement.parentElement;
    const placeholder = this.createPlaceholder(this.createPlaceholderImage());
    if (isPictureElement(parentElement)) {
      const pictureParent = parentElement.parentElement;
      this.insertPlaceholder(pictureParent, parentElement, placeholder);
    } else {
      this.insertPlaceholder(parentElement, this.imageElement, placeholder);
    }
  }

  insertPlaceholder(parentElement: HTMLElement, imagePicture: HTMLElement, placeholder: HTMLElement) {
    parentElement.insertBefore(placeholder, imagePicture);
    placeholder.style.paddingBottom = `${100 / this.imageRatio}%`;
    placeholder.appendChild(imagePicture);
  }

  createPlaceholder(placeholderImage: HTMLImageElement) {
    const placeholder = document.createElement('div');
    placeholder.classList.add('ngx-image-placeholder');
    placeholder.appendChild(placeholderImage);
    return placeholder;
  }

  createPlaceholderImage() {
    const img = new Image();
    img.classList.add('placeholder-loading-image');
    img.style.filter = this.ProgressiveImageLoader.filter;
    img.src = this.placeholderImageSrc;
    return img;
  }
}

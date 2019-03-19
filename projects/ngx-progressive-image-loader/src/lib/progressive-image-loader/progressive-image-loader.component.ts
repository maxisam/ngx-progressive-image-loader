import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2
} from '@angular/core';
import { WINDOW } from 'ngx-window-token';

import { ConfigurationService } from '../configuration.service';
import { isSpider, isSupportIntersectionObserver, loadImage } from '../util';

@Component({
  selector: 'ngx-progressive-image-loader',
  exportAs: 'ngxProgressiveImageLoader',
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressiveImageLoaderComponent implements OnInit, OnDestroy {
  // define the placeholder height for all images inside this components
  @Input() imageRatio: number;
  // how many image at least should load at the same time
  @Input() concurrentLoading: number;
  // is going to load images that are being observed but haven't been intersected yet when loading counter < concurrentLoading
  @Input() isAggressiveLoading: boolean;
  @Input() filter: string;
  // the src of loading image
  @Input() placeholderImageSrc: string;

  intersectionObserver: IntersectionObserver;
  // to store observed images
  targetMap = new Map();
  // to maintain the sequence of observed images
  targetQueue = <string[]>[];
  // counter of current loading images
  loading = 0;
  public get isObservable(): boolean {
    return !!this.intersectionObserver;
  }

  constructor(
    public _Renderer: Renderer2,
    public _ConfigurationService: ConfigurationService,
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(WINDOW) private window: any
  ) {}

  ngOnInit() {
    this.isAggressiveLoading = this._ConfigurationService.config.isAggressiveLoading;
    this.concurrentLoading = this._ConfigurationService.config.concurrentLoading;
    if (
      isSupportIntersectionObserver(this.window) &&
      !isSpider(this.window) &&
      isPlatformBrowser(this.platformId)
    ) {
      if (!this.imageRatio) {
        this.imageRatio = this._ConfigurationService.config.imageRatio;
      }

      if (!this.filter) {
        this.filter = this._ConfigurationService.config.filter;
      }
      if (!this.placeholderImageSrc) {
        this.placeholderImageSrc = this._ConfigurationService.config.placeholderImageSrc;
      }
      this.intersectionObserver = new IntersectionObserver(
        this.onIntersectionChanged.bind(this),
        this._ConfigurationService.config
      );
    }
  }

  observe(target: HTMLImageElement) {
    this.intersectionObserver.observe(target);
    this.targetMap.set(target.dataset.src, target);
    this.targetQueue.push(target.dataset.src);
  }

  unobserve(target: HTMLImageElement) {
    this.targetMap.delete(target.dataset.src);
    this.intersectionObserver.unobserve(target);
  }
  // called after an image loaded
  imageLoaded() {
    this.loading--;
    while (
      this.isAggressiveLoading &&
      this.targetQueue &&
      this.targetQueue.length &&
      this.loading <= this.concurrentLoading
    ) {
      const next = this.targetQueue.pop();
      this.targetMap.has(next) && this.loadImage(this.targetMap.get(next));
    }
  }
  onIntersectionChanged(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    entries.forEach(
      entry => entry.isIntersecting && this.loadImage(entry.target as HTMLImageElement)
    );
  }
  // start loading an image
  loadImage(image: HTMLImageElement) {
    // Stop observing the current target
    this.unobserve(image);
    this.loading++;
    loadImage(this._Renderer, image);
  }

  reset() {
    this.targetQueue = [];
    this.targetMap = new Map();
    this.isObservable && this.intersectionObserver.disconnect();
  }
  ngOnDestroy(): void {
    this.isObservable && this.intersectionObserver.disconnect();
    this.intersectionObserver = this.targetQueue = this.targetMap = undefined;
  }
}

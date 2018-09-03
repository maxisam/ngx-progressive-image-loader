import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { ProgressiveImageLoaderComponent } from '../progressive-image-loader/progressive-image-loader.component';

@Component({
  selector: 'ngx-image-placeholder',
  template: `
  <img class="placeholder-loading-image" [src]="safeLoadingImage" [style.filter]="imageFilter">
  <ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagePlaceholderComponent implements OnInit {
  @HostBinding('class')
  class = 'ngx-image-placeholder';
  @HostBinding('style')
  get placeHolder(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(
      `padding-bottom: ${100 / (this.imageRatio || this._ProgressiveImageLoader.imageRatio)}%;`
    );
  }

  // to create a placeholder before finish loading the real image to avoid reflow
  @Input()
  imageRatio: number;
  // a loading image showing before the real image is loaded
  @Input()
  placeholderImageSrc: string;

  get imageFilter(): SafeStyle {
    if (!this._ProgressiveImageLoader.filter) {
      return this.sanitizer.bypassSecurityTrustStyle(`blur(${this._ProgressiveImageLoader.blurFilter}px)`);
    }
    return this.sanitizer.bypassSecurityTrustStyle(`${this._ProgressiveImageLoader.filter}`);
  }

  get safeLoadingImage(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustUrl(
      this.placeholderImageSrc || this._ProgressiveImageLoader.placeholderImageSrc
    );
  }

  constructor(private sanitizer: DomSanitizer, private _ProgressiveImageLoader: ProgressiveImageLoaderComponent) {}

  ngOnInit() {}
}

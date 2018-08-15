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
  class = 'progressive-image-placeholder';
  @HostBinding('style')
  get placeHolder(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(
      `padding-bottom: ${100 / (this.imageRatio || this._ProgressiveImageLoader.imageRatio)}%;`
    );
  }

  @Input()
  imageRatio: number;
  @Input()
  loadingImage: string;

  get imageFilter(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(`blur(${this._ProgressiveImageLoader.blurFilter}px)`);
  }

  get safeLoadingImage() {
    return this.sanitizer.bypassSecurityTrustUrl(this.loadingImage || this._ProgressiveImageLoader.placeHolderImage);
  }

  constructor(private sanitizer: DomSanitizer, private _ProgressiveImageLoader: ProgressiveImageLoaderComponent) {}

  ngOnInit() {}
}

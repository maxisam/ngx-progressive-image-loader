import { Directive, ElementRef, Inject, OnInit, Renderer2 } from '@angular/core';
import { WINDOW } from 'ngx-window-token';

import { isSupportIntersectionObserver, loadImage } from '../util';

@Directive({
  // make sure the element is an image element
  selector: 'picture[ngxProgressiveImage], img[ngxProgressiveImage]'
})
export class ProgressiveImageDirective implements OnInit {
  src: string;
  imageElement: HTMLImageElement | HTMLPictureElement;

  constructor(private _ElementRef: ElementRef, public _Renderer: Renderer2, @Inject(WINDOW) private window: any) {}
  ngOnInit(): void {
    this.imageElement = this._ElementRef.nativeElement;
    if (isSupportIntersectionObserver(this.window)) {
      this.setOnLoadedAction();
    } else {
      // show image directly
      loadImage(this._Renderer, this.imageElement);
    }
  }
  setOnLoadedAction() {
    // add loaded to image's class
    if (this.imageElement instanceof HTMLImageElement) {
      this.imageElement.onload = () => {
        this.imageElement.classList.add('loaded');
      };
    } else {
      // picture element
      const sourceElms = this.imageElement.children;
      for (let index = 0; index < sourceElms.length; index++) {
        const element = sourceElms[index] as HTMLElement;
        // only image element get onload event
        if (element instanceof HTMLImageElement) {
          element.onload = () => {
            element.parentElement.classList.add('loaded');
          };
        }
      }
    }
  }
}

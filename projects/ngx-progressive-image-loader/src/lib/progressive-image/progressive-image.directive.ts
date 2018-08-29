import { Directive, ElementRef, Inject, OnInit, Renderer2 } from '@angular/core';
import { WINDOW } from 'ngx-window-token';

@Directive({
  selector: '[ngxProgressiveImage]'
})
export class ProgressiveImageDirective implements OnInit {
  src: string;
  imageElement: HTMLImageElement | HTMLPictureElement;

  constructor(private _ElementRef: ElementRef, public _Renderer: Renderer2, @Inject(WINDOW) private window: any) {}
  ngOnInit(): void {
    this.imageElement = this._ElementRef.nativeElement;
    if (
      'IntersectionObserver' in this.window &&
      'IntersectionObserverEntry' in this.window &&
      'intersectionRatio' in this.window.IntersectionObserverEntry.prototype
    ) {
      // make sure the element is an image element
      if (this.imageElement instanceof HTMLImageElement || this.imageElement instanceof HTMLPictureElement) {
        // add loaded to image's class

        if (this.imageElement instanceof HTMLImageElement) {
          this.imageElement.onload = () => {
            this.imageElement.classList.add('loaded');
          };
          if (this.imageElement.src) {
            this.src = this.imageElement.src;
            this._Renderer.removeAttribute(this.imageElement, 'src');
            this._Renderer.setAttribute(this.imageElement, 'data-src', this.src);
          } else {
            this.src = this.imageElement.srcset;
            this._Renderer.removeAttribute(this.imageElement, 'srcset');
            this._Renderer.setAttribute(this.imageElement, 'data-srcset', this.src);
          }
        } else {
          const sourceElms = this.imageElement.children;
          for (let index = 0; index < sourceElms.length; index++) {
            const element = sourceElms[index] as HTMLElement;
            if (element instanceof HTMLSourceElement) {
              this.src = element.srcset;
              this._Renderer.removeAttribute(element, 'srcset');
              this._Renderer.setAttribute(element, 'data-srcset', this.src);
            } else if (element instanceof HTMLImageElement) {
              element.onload = () => {
                element.parentElement.classList.add('loaded');
              };
              this.src = element.src;
              this._Renderer.removeAttribute(element, 'src');
              this._Renderer.setAttribute(element, 'data-src', this.src);
            }
          }
        }
      } else {
        throw new Error('ngxProgressiveImage can only be apply to an image or picture element');
      }
    }
  }
}

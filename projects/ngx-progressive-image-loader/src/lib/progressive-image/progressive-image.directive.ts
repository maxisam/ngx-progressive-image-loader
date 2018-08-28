import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ngxProgressiveImage]'
})
export class ProgressiveImageDirective implements OnInit {
  src: string;
  imageElement: HTMLImageElement | HTMLPictureElement;
  constructor(private _ElementRef: ElementRef, public _Renderer: Renderer2) {}
  ngOnInit(): void {
    this.imageElement = this._ElementRef.nativeElement;

    // make sure the element is an image element
    if (this.imageElement instanceof HTMLImageElement || this.imageElement instanceof HTMLPictureElement) {
      // add loaded to image's class
      this.imageElement.onload = () => {
        this.imageElement.classList.add('loaded');
      };
      if (this.imageElement instanceof HTMLImageElement) {
        if (this.imageElement.src) {
          this.src = this.imageElement.src;
          this._Renderer.removeAttribute(this.imageElement, 'src');
          this._Renderer.setAttribute(this.imageElement, 'data-src', this.src);
        }
      } else {
        // TODO: handle picture
      }
    } else {
      throw new Error('ngxProgressiveImage can only be apply to an image or picture element');
    }
  }
}

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
    this.imageElement.onload = () => {
      this.imageElement.classList.add('loaded');
    };
    if (this.imageElement instanceof HTMLImageElement) {
      if (this.imageElement.src) {
        this.src = this.imageElement.src;
        this._Renderer.removeAttribute(this.imageElement, 'src');
        this._Renderer.setAttribute(this.imageElement, 'data-src', this.src);
      }
    }
  }
}

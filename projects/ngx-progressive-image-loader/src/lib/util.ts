import { Renderer2 } from '@angular/core';

export function isSupportIntersectionObserver(window) {
  return (
    window &&
    'IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype
  );
}

export function isImagePicture(element: HTMLElement) {
  return element instanceof HTMLImageElement || element instanceof HTMLPictureElement;
}

export function setAttribute(
  renderer: Renderer2,
  attribute: string,
  element: HTMLImageElement | HTMLSourceElement
) {
  renderer.setAttribute(element, attribute, element.dataset[attribute]);
  // maybe doesn't matter
  // renderer.removeAttribute(element, 'data-' + attribute);
}
export function isPictureElement(element: HTMLElement) {
  return element.nodeName === 'PICTURE';
}
export function loadImage(renderer: Renderer2, image: HTMLImageElement) {
  if (isPictureElement(image.parentElement)) {
    const sourceElms = image.parentElement.children;
    for (let index = 0; index < sourceElms.length; index++) {
      const element = sourceElms[index];
      if (element instanceof HTMLSourceElement) {
        setAttribute(renderer, 'srcset', element);
      } else if (element instanceof HTMLImageElement) {
        setAttribute(renderer, 'src', element);
      }
    }
  } else {
    if (image.dataset.src) {
      setAttribute(renderer, 'src', image);
    }
    if (image.dataset.srcset) {
      setAttribute(renderer, 'srcset', image);
    }
  }
}

export function isSpider(window) {
  return (
    (window && !('onscroll' in window)) ||
    /(gle|ing|ro)bot|crawl|spider/i.test(window.navigator.userAgent)
  );
}

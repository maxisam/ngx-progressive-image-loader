import { Renderer2 } from '@angular/core';

export function isSupportIntersectionObserver(window) {
  return (
    'IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype
  );
}

export function isImagePicture(element: HTMLElement) {
  return element instanceof HTMLImageElement || element instanceof HTMLPictureElement;
}

function setAttribute(renderer: Renderer2, attribute: string, element: HTMLImageElement | HTMLSourceElement) {
  renderer.setAttribute(element, attribute, element.dataset[attribute]);
  // maybe doesn't matter
  // renderer.removeAttribute(element, 'data-' + attribute);
}

export function loadImage(renderer: Renderer2, image: Element) {
  if (image instanceof HTMLImageElement) {
    if (image.dataset.src) {
      setAttribute(renderer, 'src', image);
    }
    if (image.dataset.srcset) {
      setAttribute(renderer, 'srcset', image);
    }
  } else if (image instanceof HTMLPictureElement) {
    const sourceElms = image.children;
    for (let index = 0; index < sourceElms.length; index++) {
      const element = sourceElms[index];
      if (element instanceof HTMLSourceElement) {
        setAttribute(renderer, 'srcset', element);
      } else if (element instanceof HTMLImageElement) {
        setAttribute(renderer, 'src', element);
      }
    }
  }
}

export function isSpider(window) {
  (window && !('onscroll' in window)) || /(gle|ing|ro)bot|crawl|spider/i.test(window.navigator.userAgent);
}

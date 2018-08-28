import { InjectionToken } from '@angular/core';

export interface IImageLoaderOptions extends IntersectionObserverInit {
  placeHolderImage: string;
  imageRatio: number;
  blurFilter: number;
}
export const IMAGE_LOADER_CONFIG_TOKEN = new InjectionToken<IImageLoaderOptions>('Image loader Config');

export const DEFAULT_IMAGE_LOADER_OPTIONS = <IImageLoaderOptions>{
  // root?: Element | null;
  rootMargin: '0px',
  threshold: 0.5,
  imageRatio: 16 / 9,
  blurFilter: 0,
  placeHolderImage:
    // tslint:disable-next-line:max-line-length
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICA8cGF0aCBmaWxsPSIjZGQwMDMxIiBkPSJNMTI1IDMwTDMxLjkgNjMuMmwxNC4yIDEyMy4xTDEyNSAyMzBsNzguOS00My43IDE0LjItMTIzLjF6Ii8+CiAgPHBhdGggZmlsbD0iI2MzMDAyZiIgZD0iTTEyNSAzMHYyMi4yLS4xVjIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMUwxMjUgMzB6Ii8+CiAgPHBhdGggZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiBmaWxsPSIjZmZmIi8+Cjwvc3ZnPgo='
};

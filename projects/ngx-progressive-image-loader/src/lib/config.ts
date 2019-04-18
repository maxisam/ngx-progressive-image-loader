import { InjectionToken } from '@angular/core';

export interface IImageLoaderOptions extends IntersectionObserverInit {
  placeholderImageSrc?: string;
  imageRatio: number;
  filter: string;
  isAggressiveLoading: boolean;
  concurrentLoading: number;
}
export const IMAGE_LOADER_CONFIG_TOKEN = new InjectionToken<IImageLoaderOptions>(
  'Image loader Config'
);

export const DEFAULT_IMAGE_LOADER_OPTIONS = <IImageLoaderOptions>{
  // root?: Element | null;
  rootMargin: '10px',
  threshold: [0.1, 0.5, 1],
  imageRatio: 16 / 9,
  placeholderImageSrc: '',
  isAggressiveLoading: true,
  concurrentLoading: 4
};

import { InjectionToken } from '@angular/core';

export interface IImageLoaderOptions extends IntersectionObserverInit {
  placeHolderImage?: string;
  imageRatio: number;
  blurFilter: number;
  // if filter is set, it will override blurFilter
  filter: string;
}
export const IMAGE_LOADER_CONFIG_TOKEN = new InjectionToken<IImageLoaderOptions>('Image loader Config');

export const DEFAULT_IMAGE_LOADER_OPTIONS = <IImageLoaderOptions>{
  // root?: Element | null;
  rootMargin: '10px',
  threshold: 0.1,
  imageRatio: 16 / 9,
  blurFilter: 0,
  placeHolderImage: ''
};

import { Inject, Injectable } from '@angular/core';

import {
  DEFAULT_IMAGE_LOADER_OPTIONS,
  IImageLoaderOptions,
  IMAGE_LOADER_CONFIG_TOKEN
} from './config';

@Injectable()
export class ConfigurationService {
  config: IImageLoaderOptions;

  constructor(@Inject(IMAGE_LOADER_CONFIG_TOKEN) options: IImageLoaderOptions) {
    this.setConfig(options);
  }

  setConfig(config: IImageLoaderOptions) {
    if (config) {
      this.config = { ...DEFAULT_IMAGE_LOADER_OPTIONS, ...config };
    } else {
      this.config = DEFAULT_IMAGE_LOADER_OPTIONS;
    }
  }
}

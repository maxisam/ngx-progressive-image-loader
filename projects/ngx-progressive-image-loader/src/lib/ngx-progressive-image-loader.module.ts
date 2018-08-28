import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxWindowTokenModule } from 'ngx-window-token';

import { IImageLoaderOptions, IMAGE_LOADER_CONFIG_TOKEN } from './config';
import { ConfigurationService } from './configuration.service';
import { ImagePlaceholderComponent } from './image-placeholder/image-placeholder.component';
import { ProgressiveImageLoaderComponent } from './progressive-image-loader/progressive-image-loader.component';
import { ProgressiveImageDirective } from './progressive-image/progressive-image.directive';

export function ConfigurationServiceFactory(options: IImageLoaderOptions) {
  return new ConfigurationService(options);
}
@NgModule({
  imports: [NgxWindowTokenModule],
  declarations: [ProgressiveImageLoaderComponent, ProgressiveImageDirective, ImagePlaceholderComponent],
  exports: [ProgressiveImageLoaderComponent, ProgressiveImageDirective, ImagePlaceholderComponent]
})
export class NgxProgressiveImageLoaderModule {
  public static forRoot(config?: IImageLoaderOptions): ModuleWithProviders {
    return {
      ngModule: NgxProgressiveImageLoaderModule,
      providers: [
        { provide: IMAGE_LOADER_CONFIG_TOKEN, useValue: config },
        {
          provide: ConfigurationService,
          useFactory: ConfigurationServiceFactory,
          deps: [IMAGE_LOADER_CONFIG_TOKEN]
        }
      ]
    };
  }
}

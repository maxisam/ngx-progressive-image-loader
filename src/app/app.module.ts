import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxProgressiveImageLoaderModule } from 'ngx-progressive-image-loader';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxProgressiveImageLoaderModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

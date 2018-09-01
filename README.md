[![Build Status](https://travis-ci.org/maxisam/ngx-progressive-image-loader.svg?branch=master)](https://travis-ci.org/maxisam/ngx-progressive-image-loader)
[![npm](https://img.shields.io/npm/dt/ngx-progressive-image-loader.svg?style=flat-square)](https://www.npmjs.com/package/ngx-progressive-image-loader)
[![GitHub release](https://img.shields.io/github/release/maxisam/ngx-progressive-image-loader.svg?style=flat-square)](https://github.com/maxisam/ngx-progressive-image-loader/releases)
[![npm](https://img.shields.io/npm/l/ngx-progressive-image-loader.svg?style=flat-square)]()

# ngx-progressive-image-loader

Support Angular >=6.0.0

## Demo

[stackblitz.com](https://stackblitz.com/github/maxisam/ngx-progressive-image-loader)

## Features

- No other JS dependency. Just Angular

- Use **IntersectionObserver** to determine the timing to load the image

- Support image and picture

- Preserve space to avoid dom reflow

- Show small default loading image with fading transition

- Load image directly for spider (SEO friendly) or non-supported browsers

## Install

```bat
npm install ngx-progressive-image-loader --save
```

Open your module file e.g `app.module.ts` and update **imports** array

```ts
import { NgxProgressiveImageLoaderModule, IImageLoaderOptions } from 'ngx-progressive-image-loader';
...
imports: [
...
     NgxProgressiveImageLoaderModule.forRoot(<IImageLoaderOptions>{
      // rootMargin must be specified in pixels or percent
      rootMargin: '30px',
      threshold: 0.1,
      // css filter
      filter: 'blur(3px) drop-shadow(0 0 0.75rem crimson)',
      // image width / height ratio for image holder
      imageRatio: 16 / 9,
      // loading image in placeholder. Can be URL or base64
      placeHolderImage:
        // tslint:disable-next-line:max-line-length
        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICA8cGF0aCBmaWxsPSIjZGQwMDMxIiBkPSJNMTI1IDMwTDMxLjkgNjMuMmwxNC4yIDEyMy4xTDEyNSAyMzBsNzguOS00My43IDE0LjItMTIzLjF6Ii8+CiAgPHBhdGggZmlsbD0iI2MzMDAyZiIgZD0iTTEyNSAzMHYyMi4yLS4xVjIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMUwxMjUgMzB6Ii8+CiAgPHBhdGggZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiBmaWxsPSIjZmZmIi8+Cjwvc3ZnPgo='
    })
...
]
```

Add style to your global scss

```scss
@import '~ngx-progressive-image-loader/ngx-progressive-image-loader';

$scale: 0.5; // the scale of loading image in place holder
@include progressive-image-loader($scale);
```

## Usage

- with img

```html
<ngx-progressive-image-loader>
  <ngx-image-placeholder>
    <img [src]="'/assets/Avengers1.jpg'" alt="" ngxProgressiveImage>
  </ngx-image-placeholder>
   <ngx-image-placeholder>
    <img src="/assets/Avengers2.jpg" alt="" ngxProgressiveImage>
  </ngx-image-placeholder>
</ngx-progressive-image-loader>
```

- with img + srcset

```html
<ngx-progressive-image-loader>
  <ngx-image-placeholder>
    <img [src]="'/assets/Avengers6.jpg'" [srcset]="'/assets/Avengers6.jpg 800w,/assets/Avengers7.jpg 1366w'"
      size="(max-width: 1000px) 100vw, 100vw" ngxProgressiveImage>
  </ngx-image-placeholder>
</ngx-progressive-image-loader>
```

- with picture element

```html
<ngx-progressive-image-loader>
  <ngx-image-placeholder>
    <picture ngxProgressiveImage>
      <source [srcset]="'/assets/Avengers4.jpg'" media="(max-width: 1000px)">
      <source [srcset]="'/assets/Avengers5.jpg'" media="(min-width: 1000px)">
      <img [src]="'/assets/Avengers4.jpg'" alt="My default image">
    </picture>
  </ngx-image-placeholder>
</ngx-progressive-image-loader>
```

## Configuration for IImageLoaderOptions

[Intersection_observer_options](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options)

- root
  The element that is used as the viewport for checking visiblity of the target. Must be the ancestor of the target. Defaults to the browser viewport if not specified or if null.

- rootMargin  
  Margin around the root. Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px" (top, right, bottom, left). The values can be percentages. This set of values serves to grow or shrink each side of the root element's bounding box before computing intersections. Defaults to all zeros.

- threshold
  Either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed. If you only want to detect when visibility passes the 50% mark, you can use a value of 0.5. If you want the callback run every time visibility passes another 25%, you would specify the array [0, 0.25, 0.5, 0.75, 1]. The default is 0 (meaning as soon as even one pixel is visible, the callback will be run). A value of 1.0 means that the threshold isn't considered passed until every pixel is visible.

- blurFilter
  If you just need blur filter for loading image. Set a number to it.

- filter
  If you want to set more [filter](https://developer.mozilla.org/en-US/docs/Web/CSS/filter). It uses the input string as css filter.

- placeHolderImageSrc
  src for loading image. It works just like src, takes base64 or url.

For `ngx-image-placeholder` directive, it takes

- imageRatio
  image width / height

- placeHolderImageSrc

For `ngx-progressive-image-loader` directive, it takes

- imageRatio

- placeHolderImageSrc

- filter / blurFilter

## Build project

```bat
npm i

npm run build
```

To run demo code locally

`npm run start`

## Browser Compatibility

Browsers don't support Intersection Observer API will not work as expect. It will load images like old time.

Use [pollyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill) like below might make it work.

```html
<script src="https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver"></script>
```

## Contributing

- Your commits conform to the conventions established [here](https://github.com/conventional-changelog/conventional-changelog-angular/blob/master/convention.md)

## Troubleshooting

Please ask your general questions at https://stackoverflow.com

## Shoutouts 🙏

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.0 beta 02.

Kudos to the following authors:

https://deanhume.com/lazy-loading-images-using-intersection-observer/

https://www.voorhoede.nl/en/blog/say-no-to-image-reflow/

https://jmperezperez.com/medium-image-progressive-loading-placeholder/

https://github.com/verlok/lazyload for detecting spider

And my wife and my child to let me work on a weekend for this.

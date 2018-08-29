[![Build Status](https://travis-ci.org/maxisam/ngx-progressive-image-loader.svg?branch=master)](https://travis-ci.org/maxisam/ngx-progressive-image-loader)
[![npm](https://img.shields.io/npm/dt/ngx-progressive-image-loader.svg?style=flat-square)](https://www.npmjs.com/package/ngx-progressive-image-loader)
[![GitHub release](https://img.shields.io/github/release/maxisam/ngx-progressive-image-loader.svg?style=flat-square)](https://github.com/maxisam/ngx-progressive-image-loader/releases)
[![npm](https://img.shields.io/npm/l/ngx-progressive-image-loader.svg?style=flat-square)]()

# ngx-progressive-image-loader

Support Angular >=6.0.0

## Demo

[stackblitz.com](https://stackblitz.com/github/maxisam/ngx-progressive-image-loader)

## Features

- No other JS dependency. Just Angular.

- Use **IntersectionObserver** to determine the timing to load the image.

- Support image and picture

- Preserve space to avoid dom reflow

- Show small default loading image with fading transition

- Doesn't need to change original image / picture code. Just need to add some attributes and wrappers.

## Install

```bat
npm install ngx-progressive-image-loader --save
```

Open your module file e.g `app.module.ts` and update **imports** array

```ts
import { NgxProgressiveImageLoaderModule } from 'ngx-progressive-image-loader';
...
imports: [
...
     NgxProgressiveImageLoaderModule.forRoot(<IImageLoaderOptions>{
      placeHolderImage:
        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICA8cGF0aCBmaWxsPSIjZGQwMDMxIiBkPSJNMTI1IDMwTDMxLjkgNjMuMmwxNC4yIDEyMy4xTDEyNSAyMzBsNzguOS00My43IDE0LjItMTIzLjF6Ii8+CiAgPHBhdGggZmlsbD0iI2MzMDAyZiIgZD0iTTEyNSAzMHYyMi4yLS4xVjIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMUwxMjUgMzB6Ii8+CiAgPHBhdGggZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiBmaWxsPSIjZmZmIi8+Cjwvc3ZnPgo='
    })
...
]
```

Add style to your global scss

```scss
@import '~ngx-progressive-image-loader/ngx-progressive-image-loader';

@include progressive-image-loader();
```

## Build project

```bat
npm i

npm run build
```

To run demo code locally

`npm run start`

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

And my wife and my child to let me work on a weekend for this.

# VueLoaderOptionsPlugin

A little helper for [vue-loader](https://github.com/vuejs/vue-loader)'s advanced loader configuration. Now you can use functional plugins for loaders options!

## Why we need this?

According to vue-loader's mechanism, it would stringify your options for loaders as a query. In that way, plugins like [stylus-loader](https://github.com/shama/stylus-loader) used won't work anymore.  
**VueLoaderOptionsPlugin** gives you ability to solve this kind of situations.

## How to Install?

Install it through npm:

``` bash
npm i --save-dev vue-loader-options-plugin
```

## How to use?

In your `webpack.config.js`:

```javascript
const VueLoaderOptionsPlugin = require('vue-loader-options-plugin')

module.exports = {
  // ... other config
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader', // just list loaders here
            stylus: [
              'css-loader',
              'stylus-loader'
            ]
          },
          postcss: {
            plugins: [postcss_plugin()] // notice: vue-loader deal with postcss, leave it's config here
          }
        }
      }
      // ... other rule
    ]
  },
  plugins: [
    new VueLoaderOptionsPlugin({
      babel: { // options for babel-loader, if you don't want `.babelrc`
        presets: ['es2015', 'stage-2'],
        plugins: ['transform-runtime', 'transform-object-rest-spread']
      },
      stylus: { // options for stylus-loader
        default: {
          use: [nib()], // use nib plugin
          import: ['~nib/lib/nib/index.styl']
        },
        toContext: true // stylus-loader would find options on loaderContext
      }
    }),
    // .. other plugins
  ]
}
```

## Options

Just List all loaders' options in an object as `How to use` does, you don't need write `-loader` suffix.

### loader option

**toContext** <boolean> default: false

By default, VueLoaderOptionsPlugin would append your addtional options to webpack module's loaders that would comfort most loaders (like babel-loader).  

Some other loaders (like stylus-loader) checks loaderContext for options, and **toContext** would make VueLoaderOptionsPlugin handle that case.  

## Webpack

VueLoaderOptionsPlugin is designed for **Webpack@2**, for Webpack@1, you should use `loaderQuery` way as before.

# License

Copyright (c) 2017 qiyuan-wang (AKA: zisasign)
Licensed under the MIT license.

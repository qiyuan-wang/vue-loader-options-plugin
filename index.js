function ensureLoaderSuffix(name) {
  const loaderSuffixRegexp = /-loader$/

  return loaderSuffixRegexp.test(name) ? name : `${name}-loader`
}



class VueLoaderOptionPlugin {
  constructor(options = {}) {
    this.options = options
    this.vueLoaderIdentifier = 'vue-loader/lib/selector'
  }
  apply(compiler) {
    compiler.plugin('compilation', compilation => {
      compilation.plugin('normal-module-loader', (context, module) => {
        const loaderOption = this.matchLoaderOption(module.request, module.resource)

        if (!loaderOption.loaderName || !loaderOption.options) {
          return
        }

        module.loaders.forEach(l => {
          if (l.loader.indexOf(loaderOption.loader) >= 0) {
            if (loaderOption.options.toContext) {
              context[loaderOption.loaderName] = loaderOption.options
            } else {
              l.options = loaderOption.options
            }
          }
        })
      })
    })
  }
  matchLoaderOption(request, resource) {
    const VUE_TEST = /\.vue$/
    const i = resource.indexOf('?')

    if (!VUE_TEST.test(i < 0 ? resource : resource.substr(0, i))) {
      return {}
    }


    const loaders = request.split('!')

    return loaders.reduceRight((ret, loader) => {
      Object.keys(this.options).reduce((_, loaderName) => {
        if (loader.indexOf(ensureLoaderSuffix(loaderName)) >= 0) {
          ret = {
            loaderName: loaderName,
            loader: ensureLoaderSuffix(loaderName),
            options: this.options[loaderName]
          }
        }
        return {}
      }, {})
      return ret
    }, {})
  }
}

module.exports = VueLoaderOptionPlugin

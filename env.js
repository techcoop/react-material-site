// TODO convert these to ES6 at some point
exports.parseEnv = function (env) {
  let parsedEnv = {}
  Object.keys(env).forEach((key) => {
      if (!key.includes('REACT_APP_')) {
          return
      }

      let value = env[key]
      if (value === 'true') {
          value = true
      }
  
      if (value === 'false') {
          value = false
      }
      
      if (value === 'null') {
          value = null
      }

      parsedEnv[key.replace('REACT_APP_', '')] = value
  })

  return parsedEnv
}

exports.injectIncludePaths = function (items) {
  const includePath = './node_modules'
  
  return items.map(use => {
    // If the loader is configured with no options, create one
    if (use.includes && use.includes('sass-loader')) {
      use = {loader: use, options: {includePaths: [includePath]}}
    } else if (use.loader && use.loader.includes && use.loader.includes('sass-loader')) {
      // If the loader has options already, check if it has includePaths and add accordingly
      if (use.loader.options) {
        if (use.loader.options.includePaths) {
          use.loader.options.includePaths.push(includePath)
        } else {
          use.loader.options.includePaths = [includePath]
        }
      } else if (use.options) {
        if (use.options.includePaths) {
          use.options.includePaths.push(includePath)
        } else {
          use.options.includePaths = [includePath]
        }
      }
    }

    return use
  })
}

/* 
 * Inject includePaths into sass-loader options for ./node_modules directory
 * 
 * Searches configuration structure for "sass-loader" uses
 * Hopefully by searching through the config structure it will break less often (but probably not)
 *
 * Config overrides provided by:
 * TODO Not maintained actively anymore, could explode
 * https://github.com/timarney/react-app-rewired
 * 
 * More details here:
 * TODO Check back later, could be added to CRA directly
 * https://github.com/facebook/create-react-app/issues/4494
 */ 

const EnvironmentPlugin = require('webpack').EnvironmentPlugin
// TODO remove paths
const parseEnv = require('./src/env').parseEnv
const injectIncludePaths = require('./src/env').injectIncludePaths

module.exports = function override(config) {
  // Add includes paths for sass-loader
  config.module.rules = config.module.rules.map(item => {
    if (item.oneOf) {
      item.oneOf = item.oneOf.map(loader => {
        // If this is a sass include
        if (loader.test && new RegExp(loader.test).toString().includes('(scss|sass)')) {
          // If loader.use is set
          if (loader.use) {
            loader.use = injectIncludePaths(loader.use, ['./node_modules', './src'], '@import "_variables.scss";')
          }
          
          if (loader.loader) {
            loader.loader = injectIncludePaths(loader.loader, ['./node_modules', './src'], '@import "_variables.scss";')
          }
        }

        return loader
      })
    }

    return item
  })
  
  // Add parsed environment variables into app
  let parsedEnvs
  config.plugins.forEach(plugin => {
    if (plugin.replacements) {
      parsedEnvs = parseEnv(plugin.replacements)
    }

    return plugin
  })
  
  config.plugins.push(new EnvironmentPlugin(parsedEnvs))

  return config
}

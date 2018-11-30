import auth0 from 'auth0-js'

export const defaultConfig = {
  enabled: process.env.AUTH_ENABLED,
  id: process.env.AUTH_CLIENT_ID,
  domain: process.env.AUTH_CLIENT_DOMAIN,
  callback: process.env.AUTH_CLIENT_CALLBACK,
  audience: process.env.AUTH_CLIENT_AUDIENCE,
  scope: process.env.AUTH_CLIENT_SCOPE
}

// Creates an auth client with config
export const createAuthClient = (config = defaultConfig) => {
  if (!config || !config.enabled) {
    return
  }
  
  if (!config.id) {
    throw new TypeError('No client ID supplied for auth. Set REACT_APP_AUTH_CLIENT_ID in .env ')
  }

  if (!config.domain) {
    throw new TypeError('No domain supplied for auth. Set REACT_APP_AUTH_CLIENT_DOMAIN in .env ')
  }

  if (!config.callback) {
    throw new TypeError('No callback supplied for auth. Set REACT_APP_AUTH_CLIENT_CALLBACK in .env ')
  }

  if (!config.scope) {
    throw new TypeError('No scope supplied for auth. Set REACT_APP_AUTH_CLIENT_SCOPE in .env ')
  }

  // If no custom audience is set, use the default
  if (!config.audience) {
    config.audience = `https://${config.domain}/userinfo`
  }

  return new auth0.WebAuth({
    clientID: config.id,
    domain: config.domain,
    redirectUri: config.callback,
    audience: config.audience,
    responseType: 'token id_token',
    scope: config.scope
  })
}

export default createAuthClient()

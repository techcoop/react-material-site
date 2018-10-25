import auth0 from 'auth0-js'
import { defaultConfig, createAuthClient } from './auth'

describe('auth :: createAuthClient', () => {
  it('should return undefined when no config is passed', () => {
    expect(createAuthClient(null)).toEqual(undefined)
  })

  it('should return undefined when no config.enabled is false', () => {
    const config = {
      enabled: false
    }

    expect(createAuthClient(config)).toEqual(undefined)
  })

  it('should throw a TypeError when no id is passed', () => {
    const config = {
      enabled: true
    }

    expect(() => createAuthClient(config)).toThrow(TypeError)
  })

  it('should throw a TypeError when no domain is passed', () => {
    const config = {
      enabled: true,
      id: '123'
    }

    expect(() => createAuthClient(config)).toThrow(TypeError)
  })

  it('should throw a TypeError when no callback is passed', () => {
    const config = {
      enabled: true,
      id: '123',
      domain: 'test.com'
    }

    expect(() => createAuthClient(config)).toThrow(TypeError)
  })

  it('should throw a TypeError when no scope is passed', () => {
    const config = {
      enabled: true,
      id: '123',
      domain: 'test.com',
      callback: 'test.com/callback'
    }

    expect(() => createAuthClient(config)).toThrow(TypeError)
  })

  it('should create a WebAuth client when all config are passed', () => {
    const config = {
      enabled: true,
      id: '123',
      domain: 'test.com',
      callback: 'test.com/callback',
      scope: 'openid profile email phone picture locale given_name family_name'
    }
    
    expect(createAuthClient(config)).toBeInstanceOf(auth0.WebAuth)
  })
})

describe('auth :: defaultConfig', () => {
  it('should build defaultConfig from env variables', () => {
    const config = {
      enabled: process.env.AUTH_ENABLED,
      id: process.env.AUTH_CLIENT_ID,
      domain: process.env.AUTH_CLIENT_DOMAIN,
      callback: process.env.AUTH_CLIENT_CALLBACK,
      scope: process.env.AUTH_CLIENT_SCOPE,
      audience: process.env.AUTH_CLIENT_AUDIENCE
    }
    
    expect(defaultConfig).toEqual(config)
  })
})
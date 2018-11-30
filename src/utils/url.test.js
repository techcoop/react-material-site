import { getUrlType } from './url'

describe('url :: getUrlType', () => {
  it('should return the type for a url with https or http.', () => {
    expect(getUrlType('https://www.test.com')).toEqual('test')
    expect(getUrlType('http://www.test.com')).toEqual('test')
  })

  it('should return the type for a url with no www.', () => {
    expect(getUrlType('https://test.com')).toEqual('test')
  })

  it('should return the type for a url with no www. and more than one suffix', () => {
    expect(getUrlType('https://test.co.uk')).toEqual('test')
  })

  it('should return the type for a url with multiple sub domains and more than one suffix', () => {
    expect(getUrlType('https://www.ca.test.co.uk')).toEqual('test')
  })
})

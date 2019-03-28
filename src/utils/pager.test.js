import { getPagerHeaders } from './pager'

const getXhrMock = (headers) => {
  return {
    getResponseHeader: (key) => {
      if (!headers[key]) {
        return null
      }

      return headers[key]
    }
  }
}

describe('pager :: getPagerHeaders', () => {
  it('should return an empty object when link or range is not present in headers', () => {
    const mock = getXhrMock({})
    expect(getPagerHeaders(mock)).toEqual({})
  })

  it('should return links, start, end, and count values', () => {
    const mock = getXhrMock({
      'Content-Range': '10-20/100',
      'Link': '<http://localhost:8000/organizations?page=2&limit=10>; rel="self", <http://localhost:8000/organizations?page=1&limit=10>; rel="first", <http://localhost:8000/organizations?page=10&limit=10>; rel="last", <http://localhost:8000/organizations?page=3&limit=10>; rel="next", <http://localhost:8000/organizations?page=1&limit=10>; rel="prev"'
    })

    const headers = getPagerHeaders(mock)

    expect(headers.count).toEqual(100)
    expect(headers.start).toEqual(11)
    expect(headers.end).toEqual(21)

    expect(headers.links.self).toEqual('http://localhost:8000/organizations?page=2&limit=10')
    expect(headers.links.first).toEqual('http://localhost:8000/organizations?page=1&limit=10')
    expect(headers.links.last).toEqual('http://localhost:8000/organizations?page=10&limit=10')
    expect(headers.links.prev).toEqual('http://localhost:8000/organizations?page=1&limit=10')
  })
})

import './polyfill'

it('should define window.Reflect as an object', () => {
    expect(typeof window.Reflect).toEqual('object')
})

it('should define Object.entries as a function', () => {
    expect(typeof Object.entries).toEqual('function')
})

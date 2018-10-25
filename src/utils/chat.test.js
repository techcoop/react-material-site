import { openChat } from './chat'

describe('chat :: openChat', () => {
  it('should call $crisp.do with chat:open', () => {
    window.$crisp = {
      do: jest.fn()
    }

    openChat()
    expect(window.$crisp.do).toHaveBeenCalledWith('chat:open')
  })
})

// Creates client instance and attaches to window
// TODO make testable? allow in test env?
// TODO add support for intercom?
export const createChatClient = (id = process.env.CHAT_CLIENT_ID) => {
  if (id && process.env.NODE_ENV !== 'test') {
    window.$crisp = []
    window.CRISP_WEBSITE_ID = id
    
    let element = document.createElement('script')
    element.src = 'https://client.crisp.chat/l.js'
    element.async = 1

    document.getElementsByTagName('head')[0].appendChild(element)
  }
}

export const openChat = () => {
  if (window.$crisp) {
    window.$crisp.do('chat:open')
  }
}

export default createChatClient()

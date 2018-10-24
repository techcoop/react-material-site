export const createLoggingClient = (id = process.env.LOGGING_CLIENT_ID) => {
  if (id !== false && process.env.NODE_ENV !== 'test') {
    let element = document.createElement('script')
    element.src = 'https://cdn.ravenjs.com/3.24.0/raven.min.js'
    element.crossorigin = 'anonymous'
    element.onload = () => {
      window.Raven.config(id).install()
    }
    
    document.getElementsByTagName('head')[0].appendChild(element)
  }
}

export default createLoggingClient()

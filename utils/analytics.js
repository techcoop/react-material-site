// Creates an analytics client
export const createAnalyticsClient = (id = process.env.ANALYTICS_ID, type = process.env.ANALYTICS_TYPE, enabled = process.env.ANALYTICS_ENABLED) => {
  if (id && process.env.NODE_ENV !== 'test' && enabled) {
    if (type === 'google') {
      let element = document.createElement('script')
      element.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
      element.async = 1
      document.getElementsByTagName('body')[0].appendChild(element)

      let elementInit = document.createElement('script')
      elementInit.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${id}');
      `
      document.getElementsByTagName('body')[0].appendChild(elementInit)
    } else {
      console.log(`utils/analytics :: ${type} is not a supported analytics platform`)
    }
  }
}

export default createAnalyticsClient()

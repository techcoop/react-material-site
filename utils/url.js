// Gets the type of the url from domain name
export const getUrlType = (url) => {
  try {
    return extractRootDomain(url).split('.')[0]
  } catch (err) {
    console.error('Unable to parse URL : ' + url)
  }
}

// Extract root domain from url
// TODO find better solution for managing this, does not work for some cases
// Original source: https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string
const extractHostname = (url) => {
  let hostname
  //find & remove protocol (http, ftp, etc.) and get hostname
  if (url.indexOf("://") > -1) {
      hostname = url.split('/')[2]
  }
  else {
      hostname = url.split('/')[0]
  }

  //find & remove port number
  hostname = hostname.split(':')[0]

  //find & remove "?"
  hostname = hostname.split('?')[0]

  return hostname
}

const extractRootDomain = (url) => {
  let domain = extractHostname(url)
  const splitArr = domain.split('.'), arrLen = splitArr.length

  //extracting the root domain here
  //if there is a subdomain 
  if (arrLen > 2) {
      domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1]
      //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
      if (splitArr[arrLen - 2].length === 2 && splitArr[arrLen - 1].length === 2) {
          //this is using a ccTLD
          domain = splitArr[arrLen - 3] + '.' + domain
      }
  }

  return domain
}

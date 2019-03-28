export const getPagerHeaders = (xhr) => {
  const range = xhr.getResponseHeader('Content-Range')
  const link = xhr.getResponseHeader('Link')

  if (!link || !range) {
    return {}
  }
  
  const values = range.split('/')
  const startAndEnd = values[0].split('-')
  const links = {}
  if (link) {
    link.replace(/<([^>]*)>;\s*rel="([\w]*)"/g, function(m, uri, type) {
      links[type] = uri;
    });
  }

  if (values[1]) {
    return {
      links,
      count: parseInt(values[1]),
      start: parseInt(startAndEnd[0]) + 1,
      end: parseInt(startAndEnd[1]) + 1
    }
  }
}

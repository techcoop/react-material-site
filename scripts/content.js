// Downloads the site content from the URL and replaces /src/content/text.json with results
var fs = require('fs')
var JSONGoogleDocs = require('json-google-docs')

// The file we will write to
var contentFile = 'src/content/text.json'

// Load .dotenv files into environment
var NODE_ENV = 'production'
if (process.env.NODE_ENV) {
  NODE_ENV = process.env.NODE_ENV
}

var envFiles = [
  `.env.${NODE_ENV}.local`,
  `.env.${NODE_ENV}`,
  NODE_ENV !== 'test' && `.env.local`,
  '.env'
].filter(Boolean)

envFiles.forEach(file => {
  if (fs.existsSync(file)) {
    require('dotenv-expand')(
      require('dotenv').config({
        path: file,
      })
    )
  }
})

// If there is no URL, stop script and output an error message
if (!process.env['REACT_APP_CONTENT_URL'] && process.env['REACT_APP_CONTENT_MODE']) {
  console.log('\n\nCould not find "REACT_APP_CONTENT_URL"\n\n')
  exitAndCreateEmpty()
}

// If we have an auto flag, and auto is not the mode that is configured, exit process
var isAuto = false
for (var i = 0; i < process.argv.length; i++) {
  if (process.argv[i] === '--auto') {
    isAuto = true
  }
}

if (process.env['REACT_APP_CONTENT_MODE'] !== 'auto' && isAuto) {
  exitAndCreateEmpty()
}

var type = 'json-google-docs'
if (process.env['REACT_APP_CONTENT_TYPE']) {
  type = process.env['REACT_APP_CONTENT_TYPE']
}

// Fetch content from json-google-docs endpoint
if (type === 'json-google-docs') {
  var JSONGoogleDocs = require('json-google-docs')
  var doc = new JSONGoogleDocs.Document(process.env['REACT_APP_CONTENT_URL'])

  doc.fetch().then(function() {
    try {
      fs.writeFileSync(contentFile, JSON.stringify(doc.data))
      console.log('json-google-docs :: Content updated')
      process.exit()
    } catch (err) {
      console.log('\n\njson-google-docs :: Error parsing ' + process.env['REACT_APP_CONTENT_URL'] + '\n\n')
      exitAndCreateEmpty()
    }
  }).catch(function() {
    console.log('\n\njson-google-docs :: Error fetching ' + process.env['REACT_APP_CONTENT_URL'] + '\n\n')
  })
}

// Fetch content from regular json endpoint
if (type === 'json') {
  var request = require('request');

  request.get(process.env['REACT_APP_CONTENT_URL'], function (error, response, body) {
    if (error) {
      console.log('\n\njson :: Error fetching ' + process.env['REACT_APP_CONTENT_URL'] + '\n\n')
      exitAndCreateEmpty()
    }

    try {
      var content = JSON.parse(body)
      fs.writeFileSync(contentFile, body)
      console.log('json :: Content updated')
      process.exit()
    } catch (err) {
      console.log('\n\njson :: Error parsing ' + process.env['REACT_APP_CONTENT_URL'] + '\n\n')
      exitAndCreateEmpty()
    }

  })

}

// TODO if type is static, do anything?

// Exit process and create empty content.json file if it does not exist
function exitAndCreateEmpty() {
  if (!fs.existsSync(contentFile)) {
    fs.writeFileSync(contentFile, '{}')
  }

  process.exit()
}

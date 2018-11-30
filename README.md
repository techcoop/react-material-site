# React-Material-Site
A VERY opinionated website framework built with react and material design which is highly configurable and high level components in order to speed development of new projects.  You won't win any awards for a site built with this, but you might just be able to have that functionality you needed yesterday.

### Some tech used
* [Material Components Web](https://github.com/material-components/material-components-web) - The foundation for all UI elements is built with new and shiny (and still Alpha) material components for web published by Google.
* [RMWC](https://jamesmfriedman.github.io/rmwc/) - The wrapper for MDC-web made by James Friedman, which adds some extra functionality and a very clean API for using components in a react app.
* [Create React App](https://github.com/facebook/create-react-app) - The amazing create-react-app by Facebook that manages build and test running without 100000 dependencies you have you manage yourself.
* [json-google-docs](https://github.com/techcoop/json-google-docs) - Converts a google docs into structured JSON and allows you to use this content within your site, functions as a CMS editor for the site.
* [form-google-sheets](https://github.com/techcoop/form-google-sheets) - Allows you to post data to an endpoint that populates a google sheet so you can deploy a basic website with a contact form with no server.

### Other cool features
* Configuration based routing system
* Support for multiple languages
* SSO Authentication with Auth0

# Requirements
* Node >= 6.0.0
* Yarn >= 0.25.0 or NPM >= 6.0.0
* Should work on Linux, OSX, Windows

# Optional Services
* [Auth0](https://auth0.com/) - Provides authentication handling and SSO
* [Netlify](https://www.netlify.com/) - Provides static hosting, SSL, and continuous deployment
* [Sentry](https://sentry.io/welcome/) - Provides error tracking and logging
* [Crisp](https://crisp.chat/en/) - Provides chat widget for in-app support
* [Google Analytics](https://analytics.google.com) - Provides site analytics
* [Google Docs](http://docs.google.com/) - Provides dynamic site content
* [Google Sheets](http://sheets.google.com/) - Provides basic data store for form submissions

# Installation

```bash
# First create a site with create-react-app
yarn create react-app amazing-site
cd amazing-site

# Add react-material-site to app with yarn
yarn add react-material-site

# OR add react-material-site to app with yarn
npm install react-material-site --save

# TODO Figure out installer script, or calling API
```

# Development
```bash
yarn start
```

# Testing
```bash
yarn test
```

# Contributors
[Colin Gagnon][admin]

[admin]: https://github.com/colingagnon
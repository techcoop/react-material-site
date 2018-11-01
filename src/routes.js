import React from 'react'
import { Route, Switch } from 'react-router-dom'

// TODO test coverage
export const getRouterData = (routes, views, authenticated) => {
  const route = []
  const menu = {}
  
  routes.forEach((section) => {
    if (section.items) {
      let menuSection = {show: () => !section.authenticated || (section.authenticated && authenticated()), items: []}
      section.items.forEach((item) => {
        // Route
        if (item.route && item.view) {
          if (!views[item.view]) {
            console.warn(`Could not find view: ${item.view} in router config `)
            return
          }
  
          route.push({route: item.route, view: views[item.view], authenticated: section.authenticated})
        }
  
        // Menu item
        if (item.label && item.route) {
          menuSection.items.push({label: item.label, route: item.route, icon: (item.icon ? item.icon : null)})
        }      
      })
  
      if (!section.location) {
        section.location = 'none'
      }
  
      if (!menu[section.location]) {
        menu[section.location] = []
      }
  
      menu[section.location].push(menuSection)
    }
  })

  return {route, menu}
}

// TODO test coverage now that it's a real function
// TODO figure out better way to handle login / signin route
export const getRouterSwitch = (data, store, extras) => (
  <Switch>
    {data.map((route, index) => (<Route key={index} path={route.route} exact render={(props) => <route.view {...props} />} />))}

    {Object.keys(extras).map((type) => {
      if (type === 'callack' || type === 'NotFound' || type === 'auth') {
        return undefined
      }

      console.log('EXTRA')
      console.log(type)
    })}

    {extras.callback && 
      <Route path='/callback' render={(props) => {
        if (/access_token|id_token|error/.test(props.location.hash)) {
          store.dispatch(extras.callback())
        }

        return null
      }} />
    }

    {extras.auth && 
      <Route path='/login' render={(props) => {
        store.dispatch(extras.auth())
        return null
      }} />
    }

    {extras.auth && 
      <Route path='/signin' render={(props) => {
        store.dispatch(extras.auth())
        return null
      }} />
    }

    {extras.NotFound && <Route path='/*' render={(props) => <extras.NotFound {...props} />} />}
  </Switch>
)
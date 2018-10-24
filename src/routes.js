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

// TODO test coverage
export const getRouterSwitch = (data, store, callback, NotFound) => (
  <Switch>
    {data.map((route, index) => (<Route key={index} path={route.route} exact render={(props) => <route.view {...props} />} />))}

    {callback && 
      <Route path='/callback' render={(props) => {
        if (/access_token|id_token|error/.test(props.location.hash)) {
          store.dispatch(callback())
        }

        return null
      }}/>
    }

    {NotFound && <Route path='/*' render={(props) => <NotFound {...props} />} />}
  </Switch>
)

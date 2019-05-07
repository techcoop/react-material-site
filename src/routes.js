import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// TODO test coverage
export const getRouterData = (routes, views, authenticated) => {
  const route = []
  const menu = {}
  
  routes.forEach((section) => {
    if (section.items) {
      let menuSection = {
        show: () => {
          if (section.toggle) {
            if (section.authenticated === authenticated()) {
              return true
            } else {
              return false
            }
          } else {
            return !section.authenticated || (section.authenticated && authenticated())
          }
        },
        authenticated: section.authenticated,
        items: []
      }
      
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
const PUBLIC_HOME_ROUTE = process.env.PUBLIC_HOME_ROUTE ? process.env.PUBLIC_HOME_ROUTE : '/'
const AUTH_HOME_ROUTE = process.env.AUTH_HOME_ROUTE ? process.env.AUTH_HOME_ROUTE : '/'
export const getRouterSwitch = (data, store, extras) => (
  <Switch>
    {data.map((route, index) => (
      <Route 
        exact 
        key={index}
        path={route.route}
        render={(props) => {
          if (route.authenticated === false) {
            return <route.view {...props} />
          }

          if (route.authenticated === true && store.getState().auth.isAuthenticated()) {
            return <route.view {...props} />
          }
          
          return <Redirect to={PUBLIC_HOME_ROUTE} />
        }} />
    ))}
    
    <Route path='/callback' render={() => {
      return <Redirect to={AUTH_HOME_ROUTE} />
    }} />

    {extras.logout && 
      <Route path='/logout' render={() => {
        store.dispatch(extras.logout())
        return null
      }} />
    }

    {extras.logout && 
      <Route path='/signout' render={() => {
        store.dispatch(extras.logout())
        return null
      }} />
    }

    {extras.login && 
      <Route path='/login' render={() => {
        store.dispatch(extras.login())
        return null
      }} />
    }

    {extras.login && 
      <Route path='/signin' render={() => {
        store.dispatch(extras.login())
        return null
      }} />
    }

    {extras.NotFound && <Route path='/*' render={(props) => <extras.NotFound {...props} />} />}
  </Switch>
)

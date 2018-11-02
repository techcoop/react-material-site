import React from 'react';
import { Route, Switch } from 'react-router-dom'; // TODO test coverage

export const getRouterData = (routes, views, authenticated) => {
  const route = [];
  const menu = {};
  routes.forEach(section => {
    if (section.items) {
      let menuSection = {
        show: () => !section.authenticated || section.authenticated && authenticated(),
        authenticated: section.authenticated,
        items: []
      };
      section.items.forEach(item => {
        // Route
        if (item.route && item.view) {
          if (!views[item.view]) {
            console.warn(`Could not find view: ${item.view} in router config `);
            return;
          }

          route.push({
            route: item.route,
            view: views[item.view],
            authenticated: section.authenticated
          });
        } // Menu item


        if (item.label && item.route) {
          menuSection.items.push({
            label: item.label,
            route: item.route,
            icon: item.icon ? item.icon : null
          });
        }
      });

      if (!section.location) {
        section.location = 'none';
      }

      if (!menu[section.location]) {
        menu[section.location] = [];
      }

      menu[section.location].push(menuSection);
    }
  });
  return {
    route,
    menu
  };
}; // TODO test coverage now that it's a real function
// TODO figure out better way to handle login / signin route

export const getRouterSwitch = (data, store, extras) => React.createElement(Switch, null, data.map((route, index) => React.createElement(Route, {
  key: index,
  path: route.route,
  exact: true,
  render: props => React.createElement(route.view, props)
})), extras.callback && React.createElement(Route, {
  path: "/callback",
  render: props => {
    if (/access_token|id_token|error/.test(props.location.hash)) {
      store.dispatch(extras.callback());
    }

    return null;
  }
}), extras.logout && React.createElement(Route, {
  path: "/logout",
  render: props => {
    store.dispatch(extras.logout());
    return null;
  }
}), extras.logout && React.createElement(Route, {
  path: "/signout",
  render: props => {
    store.dispatch(extras.logout());
    return null;
  }
}), extras.login && React.createElement(Route, {
  path: "/login",
  render: props => {
    store.dispatch(extras.login());
    return null;
  }
}), extras.login && React.createElement(Route, {
  path: "/signin",
  render: props => {
    store.dispatch(extras.login());
    return null;
  }
}), extras.NotFound && React.createElement(Route, {
  path: "/*",
  render: props => React.createElement(extras.NotFound, props)
}));
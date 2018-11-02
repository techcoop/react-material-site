import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import enquire from 'enquire.js';
import { drawerUpdate } from '../actions/ui';
import { fetchProfile } from '../actions/auth';
import './AppContainer.scss';

class AppContainer extends Component {
  shouldComponentUpdate() {
    return false;
  }

  componentWillMount() {
    if (localStorage.getItem('access_token')) {
      this.props.store.dispatch(fetchProfile());
    }
  }

  componentDidMount() {
    // If interface responsive menu is set, enable enquire to manage menu
    if (process.env.INTERFACE_RESPONSIVE_MENU) {
      try {
        enquire.register('screen and (min-width:1000px)', () => {
          this.props.store.dispatch(drawerUpdate({
            drawerOpen: true,
            drawerMaximized: true
          }));
        });
        enquire.register('screen and (max-width:1000px)', () => {
          this.props.store.dispatch(drawerUpdate({
            drawerOpen: false,
            drawerMaximized: false
          }));
        });
      } catch (err) {}
    }
  }

  render() {
    const {
      history,
      store,
      routes
    } = this.props;
    return React.createElement(Provider, {
      store: store
    }, React.createElement("div", {
      style: {
        height: '100%'
      }
    }, React.createElement(ConnectedRouter, {
      history: history,
      children: routes
    })));
  }

}

AppContainer.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  routes: PropTypes.object.isRequired
};
export default AppContainer;
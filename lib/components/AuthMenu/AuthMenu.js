import React from 'react';
import PropTypes from 'prop-types';
import cN from 'classnames';
import { Link } from 'react-router-dom';
import { SimpleMenu, MenuItem } from '@rmwc/menu';
import IconButton from '../IconButton';
import './AuthMenu.scss'; // TODO active class name for settings URL
// TODO review classes and remove redundancies

export const AuthMenu = props => React.createElement(SimpleMenu, {
  style: props.style,
  className: cN('tc-auth-menu', props.className),
  handle: props.auth.isAuthenticated() && props.auth.profile.picture ? React.createElement(IconButton, {
    icon: props.auth.profile.picture,
    iconOptions: {
      strategy: 'url'
    },
    className: "tc-auth-menu__profile-picture"
  }) : React.createElement(IconButton, {
    icon: "account_circle"
  })
}, !props.auth.isAuthenticated() && React.createElement("div", null, React.createElement(MenuItem, {
  wrap: true
}, React.createElement(Link, {
  to: "/signin"
}, "Sign In"))), props.auth.isAuthenticated() && React.createElement("div", null, React.createElement(MenuItem, {
  wrap: true
}, React.createElement(Link, {
  to: "/settings"
}, "Settings")), React.createElement(MenuItem, {
  onClick: props.logout
}, "Sign Out")));
AuthMenu.defaultProps = {};
AuthMenu.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  auth: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};
export default AuthMenu;
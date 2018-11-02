import React from 'react';
import PropTypes from 'prop-types';
import cN from 'classnames';
import { Link } from 'react-router-dom';
import { SimpleMenu, MenuItem } from '@rmwc/menu';
import IconButton from '../IconButton';
import { getLabel } from '../../utils/content';
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
}, props.sections && props.sections.map((section, index) => {
  if (props.auth.isAuthenticated() !== section.authenticated || section.items.length === 0) {
    return React.createElement("div", {
      key: index
    });
  }

  return React.createElement("div", {
    key: index
  }, section.items.map((item, index) => React.createElement(MenuItem, {
    wrap: true,
    key: index
  }, React.createElement(Link, {
    to: item.route
  }, getLabel(item.label, props.language)))));
}));
AuthMenu.defaultProps = {};
AuthMenu.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  sections: PropTypes.array,
  auth: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};
export default AuthMenu;
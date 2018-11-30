function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';
import cN from 'classnames';
import { Link } from 'react-router-dom';
import { TopAppBar, TopAppBarRow, TopAppBarSection, TopAppBarNavigationIcon, TopAppBarTitle } from '@rmwc/top-app-bar';
import Button from '../Button';
import IconButton from '../IconButton';
import { getLabel } from '../../utils/content';
import './HeaderMenu.scss'; // TODO add logo to header
// import LogoImage from './logo.png'
// <img src={LogoImage} className='logo-image' />
// TODO waterfall doesn't work in deps yet, need to revisit
// mdc-toolbar--waterfall mdc-toolbar--flexible mdc-toolbar--flexible-default-behavior
// TODO consider renaming drawer props to generic names?
// TODO handle fixed top app bar?
// TODO remove color link styles, use proper theme

const menuItems = sections => {
  let items = [];

  if (sections) {
    sections.forEach(section => {
      if (section.show && section.show() && section.items.length > 0) {
        section.items.forEach(item => {
          items.push(item);
        });
      }
    });
  }

  return items;
};

export const HeaderMenu = props => React.createElement(TopAppBar, {
  className: cN('tc-header-menu', props.className)
}, React.createElement(TopAppBarRow, null, React.createElement(TopAppBarSection, {
  alignStart: true
}, !props.drawerMaximized && React.createElement(TopAppBarNavigationIcon, {
  icon: "menu",
  onClick: props.drawerToggle
}), React.createElement(TopAppBarTitle, {
  wrap: true,
  style: {
    overflow: 'visible'
  },
  theme: "onPrimary"
}, React.createElement(Link, {
  to: "/"
}, props.name))), React.createElement(TopAppBarSection, {
  alignEnd: true
}, menuItems(props.sections).map((item, index) => {
  const label = getLabel(item.label);

  if (item.icon) {
    return React.createElement(IconButton, _extends({
      key: index
    }, item.icon, {
      to: item.route,
      label: label
    }));
  } else {
    return React.createElement(Button, {
      key: index,
      text: label,
      to: item.route,
      theme: "onPrimary"
    });
  }
}), props.children)));
HeaderMenu.defaultProps = {
  name: window && window.location ? window.location.hostname : '',
  drawerMaximized: false
};
HeaderMenu.propTypes = {
  drawerMaximized: PropTypes.bool,
  drawerToggle: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array, PropTypes.string]),
  style: PropTypes.object,
  className: PropTypes.string,
  name: PropTypes.string
};
export default HeaderMenu;
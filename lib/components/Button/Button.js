import React from 'react';
import PropTypes from 'prop-types'; //import cN from 'classnames'

import { Button as MButton } from '@rmwc/button';
import { Link } from 'react-router-dom';
import './Button.scss'; // TODO add className and prop passing

export const Button = props => React.createElement(MButton, props, props.to ? React.createElement(Link, {
  to: props.to
}, props.children && props.children, props.text && props.text) : React.createElement("div", null, props.children && props.children, props.text && props.text));
Button.defaultProps = {
  wrap: true,
  text: ''
};
Button.propTypes = {
  wrap: PropTypes.bool,
  to: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array, PropTypes.string])
};
export default Button;
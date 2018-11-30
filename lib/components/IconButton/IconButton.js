import React from 'react';
import PropTypes from 'prop-types'; //import cN from 'classnames'

import { IconButton as MIconButton } from '@rmwc/icon-button';
import { Link } from 'react-router-dom';
import './IconButton.scss'; // TODO add className and prop passing

export const IconButton = props => React.createElement(MIconButton, props, props.to ? React.createElement(Link, {
  to: props.to
}) : null);
IconButton.defaultProps = {
  wrap: true,
  label: ''
};
IconButton.propTypes = {
  wrap: PropTypes.bool,
  to: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array, PropTypes.string])
};
export default IconButton;
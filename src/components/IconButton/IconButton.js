import React from 'react'
import PropTypes from 'prop-types'
import cN from 'classnames'
import { IconButton as MIconButton } from '@rmwc/icon-button'
import { Link } from 'react-router-dom'

import './IconButton.scss'

// TODO add className and prop passing
export const IconButton = props => (
  props.to 
    ? <Link to={props.to} className={cN('tc-icon-button', props.className)} style={props.style}>
        <MIconButton {...props} />
      </Link>
    : <MIconButton {...props} />
)

IconButton.defaultProps = {
}

IconButton.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  to: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array, PropTypes.string]),
}

export default IconButton

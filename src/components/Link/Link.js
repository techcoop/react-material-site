import React from 'react'
import PropTypes from 'prop-types'
import cN from 'classnames'
import { Link as RouterLink} from 'react-router-dom'

import './Link.scss'

export const Link = props => (
  <RouterLink to={props.to} className={cN('tc-link', props.className)} style={props.style}>
    {props.children && props.children}
    {props.text && props.text}
  </RouterLink>
)

Link.defaultProps = {
  text: ''
}

Link.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  to: PropTypes.string.isRequired,
  text: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array, PropTypes.string]),
}

export default Link

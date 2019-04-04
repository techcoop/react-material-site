import React from 'react'
import PropTypes from 'prop-types'
import { Button as MButton } from '@rmwc/button'
import { Link } from 'react-router-dom'

import './Button.scss'

export const Button = props => (
  props.to 
    ? <MButton {...props} tag={Link}>
        {props.children && props.children}
        {props.text && props.text}
      </MButton>
    : <MButton {...props}>
        {props.children && props.children}
        {props.text && props.text}
      </MButton>
)

Button.defaultProps = {
  text: ''
}

Button.propTypes = {
  to: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array, PropTypes.string]),
}

export default Button

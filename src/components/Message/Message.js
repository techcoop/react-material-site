import React from 'react'
import PropTypes from 'prop-types'
import cN from 'classnames'
import { Elevation } from '@rmwc/elevation'

import './Message.scss'

// TODO make dissimable?
// TODO make configurable body style / class?
export const Message = props => (
  <Elevation z={props.elevation} className={cN('tc-message', props.className)} style={props.style}>
    <div className='tc-message__body'>
      {props.value}
      {props.children}
    </div>
  </Elevation>
)

Message.defaultProps = {
  elevation: 1,
}

Message.propTypes = {
  elevation: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  value: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array, PropTypes.string]),
  style: PropTypes.object,
  className: PropTypes.string,
}

export default Message

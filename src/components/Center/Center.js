import React from 'react'
import PropTypes from 'prop-types'
import cN from 'classnames'

import './Center.scss'

export const Center = props => (
  <div className='tc-center'>
    <div className='tc-center__cell' style={{height: props.height}}>
      <div className={cN('tc-center__element', props.className)} style={props.style}>
        {props.children}
      </div>
    </div>
  </div>
)

Center.defaultProps = {
  height: '75vh'
}

Center.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  height: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array, PropTypes.string])
}

export default Center

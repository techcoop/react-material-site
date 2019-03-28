import React from 'react'
import PropTypes from 'prop-types'
import cN from 'classnames'

import IconButton from '../IconButton'

import './Pager.scss'

// TODO more test coverage
export const Pager = props => (
  <div className={cN('tc-pager', props.className)} style={props.style}>
    {props.links && 
      <div>
        <IconButton 
          icon='first_page'
          title='First Page'
          to={props.parseUrl(props.links.first)}
          disabled={!props.links.first || props.links.self === props.links.first}
        />
        <IconButton
          icon='chevron_left'
          title='Prev Page'
          to={props.parseUrl(props.links.prev)}      
          disabled={!props.links.prev}
        />
        <IconButton
          icon='chevron_right'
          title='Next Page'
          to={props.parseUrl(props.links.next)}
          disabled={!props.links.next}
        />
        <IconButton
          icon='last_page'
          title='Last Page'
          to={props.parseUrl(props.links.last)}
          disabled={!props.links.last || props.links.self === props.links.last}
        />
        {(props.showCounts && props.count && props.start && props.end) && 
          <span className='tc-pager__counts'>
            <span>Showing {props.start} - {props.end} of {props.count}</span>
          </span>}
      </div>}
  </div>
)

Pager.defaultProps = {
  links: {},
  parseUrl: (url) => url,
  showCounts: true,
}


Pager.propTypes = {
  links: PropTypes.object,
  showCounts: PropTypes.bool,
  count: PropTypes.number,
  start: PropTypes.number,
  end: PropTypes.number,
  parseUrl: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string
}

export default Pager

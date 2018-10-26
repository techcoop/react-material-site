import React from 'react'
import PropTypes from 'prop-types'
import cN from 'classnames'
import { Icon } from '@rmwc/icon'
import { getUrlType } from 'react-material-site/lib/utils/url'

// TODO fix imports for .css files and move to scss instead
import '@rmwc/icon/icon.css'
import './Socials.scss'
import 'icons-ceivable/socials/style.css'

// TODO make dissimable?
// TODO make configurable body style / class?
const getSocials = (items) => {
  if (items.constructor.name !== 'Array') {
    items = items.split(',')
  }
  
  return items.map((item) => ({type: getUrlType(item), url: item}))
}

export const Socials = (props) => (
  <div className={cN('tc-socials', props.className)} style={props.style}>
    {props.items && getSocials(props.items).map((item, index) => (
      <a 
        href={item.url}
        key={index}
        className='tc-socials__item'
        target={props.newTab ? '_blank' : undefined}
        style={props.itemStyle}
      >
        <Icon
          icon={item.type}
          iconOptions={{strategy: 'className', basename: 'isc-socials', prefix: 'isc-socials-'}}
        />
      </a>
    ))}
  </div>
)

Socials.defaultProps = {
  itemStyle: {},
  newTab: true
}

Socials.propTypes = {
  items: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  itemStyle: PropTypes.object,
  newTab: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
}

export default Socials

import React from 'react'
import PropTypes from 'prop-types'
import cN from 'classnames'
import { Link } from 'react-router-dom'
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarNavigationIcon,
  TopAppBarTitle
} from '@rmwc/top-app-bar'
import Button from '../Button'
import IconButton from '../IconButton'
import { getLabel } from '../../utils/content'

import './HeaderMenu.scss'

// TODO add logo to header
// import LogoImage from './logo.png'
// <img src={LogoImage} className='logo-image' />

// TODO waterfall doesn't work in deps yet, need to revisit
// mdc-toolbar--waterfall mdc-toolbar--flexible mdc-toolbar--flexible-default-behavior

// TODO consider renaming drawer props to generic names?
// TODO handle fixed top app bar?
// TODO remove color link styles, use proper theme
const menuItems = (sections) => {
  let items = []

  if (sections) {
    sections.forEach((section) => {
      if (section.show && section.show() && section.items.length > 0) {
        section.items.forEach((item) => {
          items.push(item)
        })
      }
    })
  }
  
  return items
}

export const HeaderMenu = props => (
  <TopAppBar className={cN('tc-header-menu', props.className)}>
    <TopAppBarRow>
      <TopAppBarSection alignStart>
        {!props.drawerMaximized && 
          <TopAppBarNavigationIcon icon='menu' onClick={props.drawerToggle} />}
        
        <TopAppBarTitle to='/' tag={Link} style={{overflow: 'visible'}} theme='onPrimary'>
          {props.name}
        </TopAppBarTitle>
      </TopAppBarSection>
      <TopAppBarSection alignEnd>
        {menuItems(props.sections).map((item, index) => {
          const label = getLabel(item.label)
          if (item.icon) {
            return (<IconButton key={index} {...item.icon} to={item.route} label={label} />)
          } else {
            return (<Button key={index} text={label} to={item.route} theme='onPrimary' />)
          }
        })}
        {props.children}
      </TopAppBarSection>
    </TopAppBarRow>
  </TopAppBar>
)

HeaderMenu.defaultProps = {
  name: (window && window.location ? window.location.hostname : ''),
  drawerMaximized: false
}

HeaderMenu.propTypes = {
  drawerMaximized: PropTypes.bool,
  drawerToggle: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array, PropTypes.string]),
  style: PropTypes.object,
  className: PropTypes.string,
  name: PropTypes.string
}

export default HeaderMenu

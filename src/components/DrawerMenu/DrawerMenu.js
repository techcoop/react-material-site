import React from 'react'
import PropTypes from 'prop-types'
import cN from 'classnames'
import { NavLink } from 'react-router-dom'
import {
  Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerContent
} from '@rmwc/drawer'
import {
  List,
  ListItem,
  ListItemText,
  ListItemGraphic
} from '@rmwc/list'
import { Icon } from '@rmwc/icon'
import { getLabel } from 'react-material-site/lib/utils/content'

// TODO fix imports for .css files and move to scss instead
import '@rmwc/icon/icon.css'
import './DrawerMenu.scss'

// TODO header icon handling
// TODO make navlink more extensible
// TODO make handling for no icons work without empty element
// TODO improve activeClassName state, icon not colored, add background color?
// mdc-temporary-drawer--selected and mdc-persistent-drawer--selected not working anymore??
// TODO add logo to top part of drawer menu?
// import LogoImage from './logo.png'
// <img src={LogoImage} className='logo-image' />

const getIconOptions = (icon) => {
  if ((icon && icon.startsWith('http://')) || (icon && icon.startsWith('http://'))) {
    return {startegy: 'url'}
  }

  return {}
}

export const DrawerMenu = (props) => (
  <Drawer 
    modal={!props.maximized}
    open={props.open}
    onClose={props.close}
    className={cN('tc-drawer-menu', props.className)}
    style={props.style}
  >

  {!props.maximized &&
    <DrawerHeader className='tc-drawer-menu__header'>
      <DrawerTitle className='tc-drawer-menu__header-title'>
        {props.logo && <Icon icon={props.logo} iconOptions={getIconOptions(props.logo)} className='tc-drawer-menu__header-icon' />}
        <span className='tc-drawer-menu__header-text'>{props.name}</span>
      </DrawerTitle>
    </DrawerHeader>}
  
  {props.sections &&
    <DrawerContent className='tc-drawer-menu__content'>
      {props.sections.map((section, index) => {
        if ((section.show && !section.show()) || section.items.length === 0) {
          return <div key={index} />
        }

        return (
          <List key={index} className='tc-drawer-menu__spacer'>
            {section.items.map((item, index) => (
              <ListItem wrap key={index}>
                <NavLink exact to={item.route} className='tc-drawer-menu__link' activeClassName='mdc-list-item--activated'>
                  <ListItemGraphic {...item.icon} />
                  <ListItemText>{getLabel(item.label, props.language)}</ListItemText>
                </NavLink>
              </ListItem>
            ))}
          </List>
        )
      })}
    </DrawerContent>}

  </Drawer>
)

DrawerMenu.defaultProps = {
  open: false,
  maximized: false,
  close: () => {}
}

DrawerMenu.propTypes = {
  open: PropTypes.bool,
  maximized: PropTypes.bool,
  close: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
  name: PropTypes.string,
  logo: PropTypes.string,
  language: PropTypes.string,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      show: PropTypes.func,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          icon: PropTypes.object,
          label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
          route: PropTypes.string.isRequired
        })
      )
    })
  )
}

export default DrawerMenu

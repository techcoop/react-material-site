import React from 'react'
import PropTypes from 'prop-types'
import cN from 'classnames'
import { Link } from 'react-router-dom'
import { SimpleMenu, MenuItem } from '@rmwc/menu'
import IconButton from '../IconButton'
import { getLabel } from '../../utils/content'

import './AuthMenu.scss'

// TODO active class name for settings URL
// TODO review classes and remove redundancies
export const AuthMenu = props => (
  <SimpleMenu
    style={props.style}
    className={cN('tc-auth-menu', props.className)}
    handle={
      props.auth.isAuthenticated() && props.auth.profile.picture
        ? <IconButton icon={props.auth.profile.picture} iconOptions={{ strategy: 'url' }} style={{ borderRadius: '50%' }} />
        : <IconButton icon='account_circle' />
    }
  >

    {props.sections && props.sections.map((section, index) => {
      if (props.auth.isAuthenticated() !== section.authenticated || section.items.length === 0) {
        return <div key={index} />
      }
      
      return (
        <div key={index}>
          {section.items.map((item, index) => (
            <MenuItem wrap key={index}>
              <Link to={item.route}>
                {getLabel(item.label, props.language)}
              </Link>
            </MenuItem>
          ))}
        </div>
      )
    })}
  </SimpleMenu>
)

AuthMenu.defaultProps = {
}

AuthMenu.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  sections: PropTypes.array,
  auth: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
}

export default AuthMenu

import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import cN from 'classnames'
import { drawerToggle, drawerClose, languageUpdate, globalMessageReset } from '../../actions/ui'
import { login, logout } from '../../actions/auth'
import { openChat } from '../../utils/chat'

import HeaderMenu, { HeaderMenuSpacer } from '../../components/HeaderMenu'
import FooterMenu from '../../components/FooterMenu'
import DrawerMenu from '../../components/DrawerMenu'
import LanguageMenu from '../../components/LanguageMenu'
import AuthMenu from '../../components/AuthMenu'
import CookieNotice from '../../components/CookieNotice'
import Snackbar from '../../components/Snackbar'

import './CoreLayout.scss'

const layoutStyle = {
  display: 'flex',
  flex: '1 1',
  position: 'relative'
}

// TODO improve snackbar styling
export const CoreLayout = (props) => (
  <div style={{height: 'inherit'}}>
    
    <HeaderMenu name={process.env.SITE_NAME} drawerToggle={props.drawerToggle} drawerMaximized={props.ui.drawerMaximized} sections={props.menu['top']}>
      {props.ui.language && props.ui.languages &&
        <LanguageMenu language={props.ui.language} languages={props.ui.languages} onClick={props.languageUpdate} />}

      {props.auth.enabled &&   
        <AuthMenu auth={props.auth} language={props.ui.language} sections={props.menu['auth']} login={props.login} logout={props.logout} />}
    </HeaderMenu>
    
    {(process.env.INTERFACE_RESPONSIVE_MENU && props.ui.drawerMaximized) && <HeaderMenuSpacer />}
    {((process.env.INTERFACE_RESPONSIVE_MENU && !props.ui.drawerMaximized) || !process.env.INTERFACE_RESPONSIVE_MENU) && 
      <DrawerMenu
        open={props.ui.drawerOpen}
        language={props.ui.language}
        maximized={props.ui.drawerMaximized}
        close={props.drawerClose}
        name={process.env.SITE_NAME}
        logo={process.env.SITE_LOGO}
        sections={props.menu['drawer']}
      />}

    <div className={cN('tc-core-layout', props.className)} style={Object.assign({}, props.style, layoutStyle)}>
      
      {(process.env.INTERFACE_RESPONSIVE_MENU && props.ui.drawerMaximized) && 
        <DrawerMenu
          open={props.ui.drawerOpen}
          language={props.ui.language}
          maximized={props.ui.drawerMaximized}
          close={props.drawerClose}
          name={process.env.SITE_NAME}
          logo={process.env.SITE_LOGO}
          sections={props.menu['drawer']}
        />}
      
      <main className={cN('tc-core-layout__content', props.contentClassName)} style={props.contentStyle}>
        {((process.env.INTERFACE_RESPONSIVE_MENU && !props.ui.drawerMaximized) || !process.env.INTERFACE_RESPONSIVE_MENU) && <HeaderMenuSpacer />}
        {props.children}
      </main>
      
      {props.ui.message && 
        <Snackbar 
          actionText='Get Support'
          actionHandler={openChat}
          timeout={0}
          multiline
          actionOnBottom
          onHide={props.globalMessageReset}
          show={props.ui.message !== ''}
          message={props.ui.message}
          theme='secondaryBg onSecondary'
        />}
    </div>
    
    <FooterMenu name={process.env.SITE_DISPLAY} socials={process.env.SOCIALS} />
    
    {process.env.COOKIE_NOTICE_ENABLED && 
      <CookieNotice 
        title={props.content.local.get(['cookie notice', 'title', props.ui.language])}
        message={props.content.local.get(['cookie notice', 'message', props.ui.language])}
        acceptText={props.content.local.get(['cookie notice', 'accept', props.ui.language])}
        policyText={props.content.local.get(['cookie notice', 'policy', props.ui.language])}
        policyUrL={props.content.local.get(['cookie notice', 'url', props.ui.language])}
      />}
  </div>
)

CoreLayout.defaultProps = {
}

CoreLayout.propTypes = {
  ui: PropTypes.object,
  auth: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
  contentClassName: PropTypes.string,
  contentStyle: PropTypes.object
}

const mapDispatchToProps = {
  drawerToggle: drawerToggle,
  drawerClose: drawerClose,
  languageUpdate: languageUpdate,
  globalMessageReset: globalMessageReset,
  login: login,
  logout: logout
}

const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth,
  content: state.content,
  menu: state.menu
})

// TODO reconsider that this is connected, leave up to site to do this?
export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout)

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cN from 'classnames';
import { drawerToggle, drawerClose, languageUpdate, globalMessageReset } from '../../actions/ui';
import { login, logout } from '../../actions/auth';
import { openChat } from '../../utils/chat';
import HeaderMenu, { HeaderMenuSpacer } from '../../components/HeaderMenu';
import FooterMenu from '../../components/FooterMenu';
import DrawerMenu from '../../components/DrawerMenu';
import LanguageMenu from '../../components/LanguageMenu';
import AuthMenu from '../../components/AuthMenu';
import CookieNotice from '../../components/CookieNotice';
import Snackbar from '../../components/Snackbar';
import './CoreLayout.scss';
const layoutStyle = {
  display: 'flex',
  flex: '1 1',
  position: 'relative' // TODO improve snackbar styling

};
export const CoreLayout = props => React.createElement("div", {
  style: {
    height: 'inherit'
  }
}, React.createElement(HeaderMenu, {
  name: process.env.SITE_NAME,
  drawerToggle: props.drawerToggle,
  drawerMaximized: props.ui.drawerMaximized,
  sections: props.menu['top']
}, props.ui.language && props.ui.languages && React.createElement(LanguageMenu, {
  language: props.ui.language,
  languages: props.ui.languages,
  onClick: props.languageUpdate
}), props.auth.enabled && React.createElement(AuthMenu, {
  auth: props.auth,
  language: props.ui.language,
  sections: props.menu['auth'],
  login: props.login,
  logout: props.logout
})), process.env.INTERFACE_RESPONSIVE_MENU && props.ui.drawerMaximized && React.createElement(HeaderMenuSpacer, null), (process.env.INTERFACE_RESPONSIVE_MENU && !props.ui.drawerMaximized || !process.env.INTERFACE_RESPONSIVE_MENU) && React.createElement(DrawerMenu, {
  open: props.ui.drawerOpen,
  language: props.ui.language,
  maximized: props.ui.drawerMaximized,
  close: props.drawerClose,
  name: process.env.SITE_NAME,
  logo: process.env.SITE_LOGO,
  sections: props.menu['drawer']
}), React.createElement("div", {
  className: cN('tc-core-layout', props.className),
  style: Object.assign({}, props.style, layoutStyle)
}, process.env.INTERFACE_RESPONSIVE_MENU && props.ui.drawerMaximized && React.createElement(DrawerMenu, {
  open: props.ui.drawerOpen,
  language: props.ui.language,
  maximized: props.ui.drawerMaximized,
  close: props.drawerClose,
  name: process.env.SITE_NAME,
  logo: process.env.SITE_LOGO,
  sections: props.menu['drawer']
}), React.createElement("main", {
  className: cN('tc-core-layout__content', props.contentClassName),
  style: props.contentStyle
}, (process.env.INTERFACE_RESPONSIVE_MENU && !props.ui.drawerMaximized || !process.env.INTERFACE_RESPONSIVE_MENU) && React.createElement(HeaderMenuSpacer, null), props.children), props.ui.message && React.createElement(Snackbar, {
  actionText: "Get Support",
  actionHandler: openChat,
  timeout: 0,
  multiline: true,
  actionOnBottom: true,
  onHide: props.globalMessageReset,
  show: props.ui.message !== '',
  message: props.ui.message,
  theme: "secondaryBg onSecondary"
})), React.createElement(FooterMenu, {
  name: process.env.SITE_DISPLAY,
  socials: process.env.SOCIALS
}), process.env.COOKIE_NOTICE_ENABLED && React.createElement(CookieNotice, {
  title: props.content.local.get(['cookie notice', 'title', props.ui.language]),
  message: props.content.local.get(['cookie notice', 'message', props.ui.language]),
  acceptText: props.content.local.get(['cookie notice', 'accept', props.ui.language]),
  policyText: props.content.local.get(['cookie notice', 'policy', props.ui.language]),
  policyUrL: props.content.local.get(['cookie notice', 'url', props.ui.language])
}));
CoreLayout.defaultProps = {};
CoreLayout.propTypes = {
  ui: PropTypes.object,
  auth: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
  contentClassName: PropTypes.string,
  contentStyle: PropTypes.object
};
const mapDispatchToProps = {
  drawerToggle: drawerToggle,
  drawerClose: drawerClose,
  languageUpdate: languageUpdate,
  globalMessageReset: globalMessageReset,
  login: login,
  logout: logout
};

const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth,
  content: state.content,
  menu: state.menu
}); // TODO reconsider that this is connected, leave up to site to do this?


export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
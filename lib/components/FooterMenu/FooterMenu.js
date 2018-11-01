import React from 'react';
import PropTypes from 'prop-types';
import cN from 'classnames';
import Socials from '../Socials';
import { Grid, GridCell } from '../Grid';
import Content from '../Content';
import './FooterMenu.scss'; // TODO make extensible with support for passing child elements?
// TODO display site URLs from menu items in columns of links, configurable

export const FooterMenu = props => React.createElement("footer", {
  className: cN('tc-footer', props.className),
  style: props.style
}, React.createElement("div", {
  className: "tc-footer__bottom"
}, React.createElement(Grid, null, React.createElement(GridCell, {
  span: "4",
  className: "tc-footer__socials"
}, props.socials && React.createElement(Socials, {
  items: props.socials
})), React.createElement(GridCell, {
  span: "4",
  className: "tc-footer__caption"
}, React.createElement(Content, {
  use: "caption",
  tag: "span"
}, "Copyright \xA9 ", props.name, " ", props.year)))));
FooterMenu.defaultProps = {
  name: window && window.location ? window.location.hostname : '',
  year: new Date().getFullYear()
};
FooterMenu.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  name: PropTypes.string,
  socials: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
};
export default FooterMenu;
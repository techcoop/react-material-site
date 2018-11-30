import React from 'react';
import PropTypes from 'prop-types';
import cN from 'classnames';
import { SimpleMenu, MenuItem } from '@rmwc/menu';
import IconButton from '../IconButton';
import './LanguageMenu.scss'; // TODO display selected language in anchor?
// TODO implement full language name option, 3 column grid?

export const LanguageMenu = props => React.createElement(SimpleMenu, {
  style: props.style,
  className: cN('tc-language-menu', props.className),
  handle: React.createElement(IconButton, {
    icon: "language",
    className: "tc-language-menu__icon"
  })
}, React.createElement("div", {
  className: "tc-language-menu__content"
}, props.languages && props.languages.map((language, index) => React.createElement(MenuItem, {
  onClick: () => props.onClick(language),
  className: cN('tc-language-menu__item', {
    'tc-language-menu__item_active': props.language === language
  }),
  key: index
}, language))));
LanguageMenu.defaultProps = {};
LanguageMenu.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  language: PropTypes.string.isRequired,
  languages: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
};
export default LanguageMenu;
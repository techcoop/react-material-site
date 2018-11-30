function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';
import cN from 'classnames';
import { Typography } from '@rmwc/typography';
import './Content.scss'; // header= '' headerType='' content='' contentType
// TODO add elevation support? or just do this in card instead?
// import { Elevation } from '@rmwc/elevation'
// TODO safe enough to assume that a function will be an element, or need to validate past that?

const getElements = (items, props) => {
  if (items.constructor.name !== 'Array') {
    items = [items];
  }

  return items.map((item, index) => React.createElement(Typography, _extends({
    key: index
  }, props), item));
};

export const Content = props => React.createElement("div", {
  className: cN('tc-content', props.className),
  style: props.style
}, props.header && getElements(props.header, {
  use: props.headerType,
  tag: props.headerTag,
  className: cN('tc-content__header', props.headerClassName),
  style: props.headerStyle
}), props.body && getElements(props.body, {
  use: props.bodyType,
  tag: props.bodyTag,
  className: cN('tc-content__body', props.bodyClassName),
  style: props.bodyStyle
}), props.children && getElements(props.children, {
  use: props.use,
  tag: props.tag,
  className: cN('tc-content__body', props.childrenClassName),
  style: props.childrenStyle
}));
Content.defaultProps = {
  headerType: 'headline4',
  headerTag: 'div',
  bodyType: 'body1',
  bodyTag: 'div',
  use: 'body1',
  tag: 'div'
};
const types = ['headline1', 'headline2', 'headline3', 'headline4', 'headline5', 'headline6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption', 'button', 'overline'];
Content.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  header: PropTypes.oneOfType([PropTypes.element, PropTypes.array, PropTypes.string]),
  headerType: PropTypes.oneOf(types),
  headerTag: PropTypes.string,
  headerClassName: PropTypes.string,
  headerStyle: PropTypes.object,
  body: PropTypes.oneOfType([PropTypes.element, PropTypes.array, PropTypes.string]),
  bodyType: PropTypes.oneOf(types),
  bodyTag: PropTypes.string,
  bodyClassName: PropTypes.string,
  bodyStyle: PropTypes.object,
  children: PropTypes.node,
  childrenClassName: PropTypes.string,
  childrenStyle: PropTypes.object
};
export default Content;
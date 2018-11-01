import React from 'react';
import { Link } from 'react-router-dom';
import CoreLayout from '../layouts/CoreLayout';
import { openChat } from '../utils/chat';
import './NotFound.scss';
export const NotFound = props => React.createElement(CoreLayout, props, React.createElement("div", null, React.createElement("div", null, "We're sorry, we couldn't find this page."), React.createElement("br", null), React.createElement("div", null, "Here are your options:"), React.createElement("br", null), React.createElement("div", null, React.createElement(Link, {
  to: "/"
}, "Go to Home")), React.createElement("div", null, "or"), React.createElement("div", null, React.createElement("button", {
  onClick: openChat
}, "Chat with our support")), React.createElement("div", null, "or"), React.createElement("div", null, React.createElement(Link, {
  to: "/contact"
}, "Send us an Email"))));
export default NotFound;
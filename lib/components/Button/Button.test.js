import React from 'react';
import { shallow, mount } from 'enzyme';
import Button from './Button';
import { Link } from 'react-router-dom';
it('should pass props to button and wrap by default', () => {
  const testStyle = {
    border: '1px solid red'
  };
  const wrapper = shallow(React.createElement(Button, {
    style: testStyle,
    raised: true
  }));
  expect(wrapper.props().style).toEqual(testStyle);
  expect(wrapper.props().raised).toEqual(true);
  expect(wrapper.props().wrap).toEqual(true);
});
it('should create a link when passed with to', () => {
  const to = '/test';
  const wrapper = shallow(React.createElement(Button, {
    to: to
  }));
  expect(wrapper.children().first().props().to).toEqual(to);
});
it('should create a div when passed with onClick', () => {
  const onClick = jest.fn();
  const wrapper = shallow(React.createElement(Button, {
    onClick: onClick
  }));
  expect(wrapper.props().onClick).toEqual(onClick);
});
it('should create render children', () => {
  const children = React.createElement("div", null, "Test");
  const wrapper = shallow(React.createElement(Button, null, children));
  expect(wrapper).toContainReact(children);
});
it('should create an element with text', () => {
  const text = 'Text';
  const wrapper = shallow(React.createElement(Button, {
    text: text
  }));
  const element = React.createElement("div", null, text);
  expect(wrapper).toContainReact(element);
});
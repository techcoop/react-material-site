import React from 'react';
import { shallow, mount } from 'enzyme';
import IconButton from './IconButton';
import { Link } from 'react-router-dom';
it('should pass props to button and wrap by default', () => {
  const testStyle = {
    border: '1px solid red'
  };
  const wrapper = shallow(React.createElement(IconButton, {
    style: testStyle,
    icon: "home"
  }));
  expect(wrapper.props().style).toEqual(testStyle);
  expect(wrapper.props().icon).toEqual('home');
  expect(wrapper.props().wrap).toEqual(true);
});
it('should create a link when passed with to', () => {
  const to = '/test';
  const wrapper = shallow(React.createElement(IconButton, {
    to: to
  }));
  expect(wrapper.children().first().props().to).toEqual(to);
});
it('should create a div when passed with onClick', () => {
  const onClick = jest.fn();
  const wrapper = shallow(React.createElement(IconButton, {
    onClick: onClick
  }));
  expect(wrapper.props().onClick).toEqual(onClick);
});
it('should create an element with label', () => {
  const label = 'Text';
  const wrapper = shallow(React.createElement(IconButton, {
    label: label
  }));
  expect(wrapper.props().label).toEqual(label);
});
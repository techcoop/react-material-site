import React from 'react';
import { shallow } from 'enzyme';
import IconButton from '../IconButton';
import { MenuItem } from '@rmwc/menu';
import LanguageMenu from './LanguageMenu';
it('should pass style to language menu', () => {
  const testStyle = {
    border: '1px solid red'
  };
  const wrapper = shallow(React.createElement(LanguageMenu, {
    style: testStyle
  }));
  expect(wrapper.props().style).toEqual(testStyle);
});
it('should contain default className and prop className', () => {
  const wrapper = shallow(React.createElement(LanguageMenu, {
    className: "test-class-name"
  }));
  expect(wrapper.props().className).toEqual('tc-language-menu test-class-name');
});
it('should contain a IconToggle as handle', () => {
  const element = React.createElement(IconButton, {
    icon: "language",
    className: "tc-language-menu__icon"
  });
  const wrapper = shallow(React.createElement(LanguageMenu, null));
  expect(wrapper.props().handle).toEqual(element);
});
it('should contain menu items for each item in languages', () => {
  const onClick = jest.fn();
  const wrapper = shallow(React.createElement(LanguageMenu, {
    languages: ['en', 'fr'],
    onClick: onClick
  }), {
    skipProps: ['onClick']
  });
  expect(wrapper.find(MenuItem).length).toEqual(2);
});
it('should display language and onclick handler in menu items', () => {
  const onClick = jest.fn();
  const wrapper = shallow(React.createElement(LanguageMenu, {
    languages: ['en'],
    onClick: onClick
  }), {
    skipProps: ['onClick']
  });
  const itemProps = wrapper.find(MenuItem).props();
  expect(itemProps.onClick).toBeInstanceOf(Function);
  expect(itemProps.children).toEqual('en');
});
it('should set a regular class and an active class when language is active', () => {
  const onClick = jest.fn();
  const wrapper = shallow(React.createElement(LanguageMenu, {
    language: "en",
    languages: ['en'],
    onClick: onClick
  }), {
    skipProps: ['onClick']
  });
  const itemProps = wrapper.find(MenuItem).props();
  expect(itemProps.className).toEqual('tc-language-menu__item tc-language-menu__item_active');
});
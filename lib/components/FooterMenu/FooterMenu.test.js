import React from 'react';
import { shallow, mount } from 'enzyme';
import Content from '../Content';
import { Link } from 'react-router-dom';
import FooterMenu from './FooterMenu';
it('passes style to footer', () => {
  const testStyle = {
    border: '1px solid red'
  };
  const wrapper = shallow(React.createElement(FooterMenu, {
    style: testStyle
  }));
  expect(wrapper.props().style).toEqual(testStyle);
});
it('contains default className and prop className', () => {
  const wrapper = shallow(React.createElement(FooterMenu, {
    className: "test-class-name"
  }));
  expect(wrapper.props().className).toEqual('tc-footer test-class-name');
});
it('contains a Caption with copyright information in it', () => {
  const name = React.createElement(Content, {
    use: "caption",
    tag: "span",
    className: "tc-footer__copyright"
  }, "Copyright \xA9 TEST NAME ", new Date().getFullYear());
  const wrapper = shallow(React.createElement(FooterMenu, {
    name: "TEST NAME"
  }));
  expect(wrapper).toContainReact(name);
});
it('contains a Caption with default host and year', () => {
  const year = new Date().getFullYear();
  const name = React.createElement(Content, {
    use: "caption",
    tag: "span",
    className: "tc-footer__copyright"
  }, "Copyright \xA9 localhost ", year);
  const wrapper = shallow(React.createElement(FooterMenu, null));
  expect(wrapper).toContainReact(name);
});
it('contains a Caption with name and year passed to it', () => {
  const name = React.createElement(Content, {
    use: "caption",
    tag: "span",
    className: "tc-footer__copyright"
  }, "Copyright \xA9 TEST NAME 2000");
  const wrapper = shallow(React.createElement(FooterMenu, {
    name: "TEST NAME",
    year: 2000
  }));
  expect(wrapper).toContainReact(name);
});
it('contains a menu section with items on the left', () => {
  const sections = [{
    show: () => true,
    items: [{
      label: 'Test 1',
      route: '/test-1'
    }, {
      label: 'Test 2',
      route: '/test-2'
    }]
  }];
  const wrapper = shallow(React.createElement(FooterMenu, {
    leftSections: sections
  }));
  const menuSections = wrapper.find('.tc-footer__menu-section div').first();
  expect(menuSections.props().children.length).toEqual(2);
});
it('contains a menu section with items in the middle', () => {
  const sections = [{
    show: () => true,
    items: [{
      label: 'Test 1',
      route: '/test-1'
    }, {
      label: 'Test 2',
      route: '/test-2'
    }]
  }];
  const wrapper = shallow(React.createElement(FooterMenu, {
    middleSections: sections
  }));
  const menuSections = wrapper.find('.tc-footer__menu-section div').first();
  expect(menuSections.props().children.length).toEqual(2);
});
it('contains a menu section with items on the right', () => {
  const sections = [{
    show: () => true,
    items: [{
      label: 'Test 1',
      route: '/test-1'
    }, {
      label: 'Test 2',
      route: '/test-2'
    }]
  }];
  const wrapper = shallow(React.createElement(FooterMenu, {
    rightSections: sections
  }));
  const menuSections = wrapper.find('.tc-footer__menu-section div').first();
  expect(menuSections.props().children.length).toEqual(2);
});
import React from 'react';
import { NavLink } from 'react-router-dom';
import { shallow } from 'enzyme';
import { Drawer, DrawerHeader, DrawerContent } from '@rmwc/drawer';
import { List, ListItem, ListItemText, ListItemGraphic } from '@rmwc/list';
import { Icon } from '@rmwc/icon';
import DrawerMenu from './DrawerMenu';
it('contains default className and prop className and style', () => {
  const style = {
    border: '1px solid red'
  };
  const wrapper = shallow(React.createElement(DrawerMenu, {
    className: "test-class-name",
    style: style
  }));
  expect(wrapper.props().className).toEqual('tc-drawer-menu test-class-name');
  expect(wrapper.props().style).toEqual(style);
});
it('returns a Drawer with modal set when maximized', () => {
  const wrapper = shallow(React.createElement(DrawerMenu, {
    maximized: true
  }));
  expect(wrapper.type()).toEqual(Drawer);
  expect(wrapper.props().modal).toEqual(false);
});
it('returns a Drawer with modal set when not maximized', () => {
  const wrapper = shallow(React.createElement(DrawerMenu, {
    maximized: false
  }));
  expect(wrapper.type()).toEqual(Drawer);
  expect(wrapper.props().modal).toEqual(true);
});
it('passes open and close defaults to Drawer', () => {
  const wrapper = shallow(React.createElement(DrawerMenu, null));
  expect(wrapper.props().open).toEqual(DrawerMenu.defaultProps.open);
  expect(wrapper.props().onClose).toEqual(DrawerMenu.defaultProps.close);
});
it('contains a DrawerHeader with name if maximized is false', () => {
  // TODO test icon
  const name = React.createElement("span", {
    className: "tc-drawer-menu__header-text"
  }, "TEST NAME");
  const wrapper = shallow(React.createElement(DrawerMenu, {
    maximized: false,
    name: "TEST NAME"
  }));
  expect(wrapper).toContainReact(name);
});
it('contains a List when sections with items are passed and show returns true', () => {
  const sections = [{
    show: () => true,
    items: [{
      icon: {
        icon: 'home'
      },
      label: 'Test',
      route: '/test'
    }]
  }];
  const list = React.createElement(List, {
    key: 0,
    className: "tc-drawer-menu__spacer"
  }, React.createElement(ListItem, {
    wrap: true,
    key: 0
  }, React.createElement(NavLink, {
    exact: true,
    to: "/test",
    className: "tc-drawer-menu__link",
    activeClassName: "mdc-list-item--activated"
  }, React.createElement(ListItemGraphic, {
    icon: "home"
  }), React.createElement(ListItemText, null, "Test"))));
  const wrapper = shallow(React.createElement(DrawerMenu, {
    sections: sections
  }));
  expect(wrapper).toContainReact(list);
});
it('does not contain a NavLink when sections with items are passed but show returns false', () => {
  const sections = [{
    show: () => false,
    items: [{
      icon: {
        icon: 'home'
      },
      label: 'Test',
      route: '/test'
    }]
  }];
  const list = React.createElement(List, {
    key: 0,
    className: "tc-drawer-menu__spacer"
  }, React.createElement(ListItem, {
    wrap: true,
    key: 0
  }, React.createElement(NavLink, {
    exact: true,
    to: "/test",
    className: "tc-drawer-menu__link",
    activeClassName: "tc-drawer-menu__link-active mdc-temporary-drawer--selected"
  }, React.createElement(ListItemGraphic, {
    icon: "home"
  }), React.createElement(ListItemText, null, "Test"))));
  const wrapper = shallow(React.createElement(DrawerMenu, {
    sections: sections
  }));
  expect(wrapper.contains(list)).toEqual(false);
});
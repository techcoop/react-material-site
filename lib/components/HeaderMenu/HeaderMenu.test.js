import React from 'react';
import { Link } from 'react-router-dom';
import { shallow } from 'enzyme';
import { TopAppBarTitle } from '@rmwc/top-app-bar';
import IconButton from '../IconButton';
import Button from '../Button';
import HeaderMenu from './HeaderMenu';
it('should pass default className and prop className', () => {
  const wrapper = shallow(React.createElement(HeaderMenu, {
    className: "test-class-name"
  }));
  expect(wrapper.props().className).toEqual('tc-header-menu test-class-name');
});
it('should contain a title with a link and name', () => {
  const link = React.createElement(TopAppBarTitle, {
    wrap: true,
    style: {
      overflow: 'visible'
    },
    theme: "onPrimary"
  }, React.createElement(Link, {
    to: "/"
  }, "Test Site"));
  const wrapper = shallow(React.createElement(HeaderMenu, {
    name: "Test Site"
  }));
  expect(wrapper).toContainReact(link);
});
it('should render children', () => {
  const element = React.createElement("div", null, "test");
  const wrapper = shallow(React.createElement(HeaderMenu, null, React.createElement("div", null, "test")));
  expect(wrapper).toContainReact(element);
});
it('should render sections as additional buttons when no icons passed and no route', () => {
  const sections = [{
    show: () => true,
    items: [{
      label: 'Test'
    }]
  }];
  const element = React.createElement(Button, {
    text: "Test",
    to: undefined,
    theme: "onPrimary",
    wrap: true
  });
  const wrapper = shallow(React.createElement(HeaderMenu, {
    sections: sections
  }));
  expect(wrapper).toContainReact(element);
});
it('should render sections as additional buttons when no icons passed and with a route', () => {
  const sections = [{
    show: () => true,
    items: [{
      label: 'Test',
      route: '/test'
    }]
  }];
  const element = React.createElement(Button, {
    text: "Test",
    to: "/test",
    theme: "onPrimary",
    wrap: true
  });
  const wrapper = shallow(React.createElement(HeaderMenu, {
    sections: sections
  }));
  expect(wrapper).toContainReact(element);
});
it('should render sections as additional icon buttons with labels and no route', () => {
  const sections = [{
    show: () => true,
    items: [{
      icon: {
        icon: 'home'
      },
      label: 'Test'
    }]
  }];
  const element = React.createElement(IconButton, {
    icon: "home",
    label: "Test",
    wrap: true
  });
  const wrapper = shallow(React.createElement(HeaderMenu, {
    sections: sections
  }));
  expect(wrapper).toContainReact(element);
});
it('should render sections as additional icon buttons with labels and with a route', () => {
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
  const element = React.createElement(IconButton, {
    icon: "home",
    to: "/test",
    label: "Test",
    wrap: true
  });
  const wrapper = shallow(React.createElement(HeaderMenu, {
    sections: sections
  }));
  expect(wrapper).toContainReact(element);
});
it('should render sections when shown but not render when not shown', () => {
  const sections = [{
    show: () => true,
    items: [{
      icon: {
        icon: 'home'
      },
      label: 'Test',
      route: '/test'
    }]
  }, {
    show: () => false,
    items: [{
      icon: {
        icon: 'test'
      },
      label: 'HideTest',
      route: '/hide-test'
    }]
  }];
  const element = React.createElement(IconButton, {
    icon: "home",
    to: "/test",
    label: "Test",
    wrap: true
  });
  const hideElement = React.createElement(IconButton, {
    icon: "test",
    to: "/hide-test",
    label: "HideTest",
    wrap: true
  });
  const wrapper = shallow(React.createElement(HeaderMenu, {
    sections: sections
  }));
  expect(wrapper.contains(hideElement)).toEqual(false);
});
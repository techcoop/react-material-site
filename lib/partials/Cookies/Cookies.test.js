import React from 'react';
import { shallow, mount } from 'enzyme';
import Cookies from './Cookies';
import Content from '../../components/Content';
import Table from '../../components/Table';
it('should pass style to content', () => {
  const testStyle = {
    border: '1px solid red'
  };
  const wrapper = shallow(React.createElement(Cookies, {
    style: testStyle
  }));
  expect(wrapper.props().style).toEqual(testStyle);
});
it('should contain default className and prop className', () => {
  const wrapper = shallow(React.createElement(Cookies, {
    className: "test-class-name"
  }));
  expect(wrapper.props().className).toEqual('tc-cookies test-class-name');
});
it('should contain a title when passed content with "page title"', () => {
  const text = 'Title';
  const wrapper = shallow(React.createElement(Cookies, {
    content: {
      'page title': {
        'en': text
      }
    }
  }));
  const element = React.createElement(Content, {
    className: "tc-cookies__title",
    headerType: "headline4",
    header: text
  });
  expect(wrapper).toContainReact(element);
});
it('should contain an introduction when passed content with "introduction"', () => {
  const text = 'Intro';
  const wrapper = shallow(React.createElement(Cookies, {
    content: {
      'introduction': {
        'en': text
      }
    }
  }));
  const element = React.createElement(Content, {
    className: "tc-cookies__text",
    body: text
  });
  expect(wrapper).toContainReact(element);
});
it('should contain a cookie title when passed content with "cookie title"', () => {
  const text = 'Cookies';
  const wrapper = shallow(React.createElement(Cookies, {
    content: {
      'cookie title': {
        'en': text
      }
    }
  }));
  const element = React.createElement(Content, {
    className: "tc-cookies__header",
    headerType: "headline6",
    header: text
  });
  expect(wrapper).toContainReact(element);
});
it('should contain a cookies table when passed content with "cookies"', () => {
  const data = {
    'en': [{
      'name': 'name',
      'description': 'description',
      'duration': 'duration'
    }]
  };
  const wrapper = shallow(React.createElement(Cookies, {
    content: {
      'cookies': data
    }
  }));
  const element = React.createElement(Table, {
    wrap: true,
    className: "tc-cookies__table",
    fields: {
      name: {
        label: 'Name',
        style: {
          width: '100px'
        }
      },
      description: {
        label: 'Description',
        style: {
          width: '150px'
        }
      },
      duration: {
        label: 'Duration',
        style: {
          width: '50px'
        }
      }
    },
    data: data['en']
  });
  expect(wrapper).toContainReact(element);
});
it('should contain a storage title when passed content with "storage title"', () => {
  const text = 'Storage';
  const wrapper = shallow(React.createElement(Cookies, {
    content: {
      'storage title': {
        'en': text
      }
    }
  }));
  const element = React.createElement(Content, {
    className: "tc-cookies__header",
    headerType: "headline6",
    header: text
  });
  expect(wrapper).toContainReact(element);
});
it('should contain a storage table when passed content with "storage"', () => {
  const data = {
    'en': [{
      'name': 'name',
      'description': 'description',
      'duration': 'duration'
    }]
  };
  const wrapper = shallow(React.createElement(Cookies, {
    content: {
      'storage': data
    }
  }));
  const element = React.createElement(Table, {
    wrap: true,
    className: "tc-cookies__table",
    fields: {
      name: {
        label: 'Name',
        style: {
          width: '100px'
        }
      },
      description: {
        label: 'Description',
        style: {
          width: '150px'
        }
      },
      duration: {
        label: 'Duration',
        style: {
          width: '50px'
        }
      }
    },
    data: data['en']
  });
  expect(wrapper).toContainReact(element);
});
it('should contain an statement on privacy when passed content with "privacy"', () => {
  const text = 'Privacy';
  const wrapper = shallow(React.createElement(Cookies, {
    content: {
      'privacy': {
        'en': text
      }
    }
  }));
  const element = React.createElement(Content, {
    className: "tc-cookies__text",
    body: text
  });
  expect(wrapper).toContainReact(element);
});
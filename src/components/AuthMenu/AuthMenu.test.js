import React from 'react'
import { shallow } from 'enzyme'
import { Link } from 'react-router-dom'
import IconButton from '../IconButton'
import { MenuItem } from '@rmwc/menu'

import AuthMenu from './AuthMenu'

const defaultProps = {
  auth: {
    enabled: true,
    isAuthenticated: () => (true),
    profile: {picture: '123'}
  },
  login: () => jest.fn(),
  logout: () => jest.fn()
}

it('should pass style to auth menu', () => {
  const testStyle = {
    border: '1px solid red'
  }

  const wrapper = shallow(<AuthMenu style={testStyle} {...defaultProps} />)
  expect(wrapper.props().style).toEqual(testStyle)
})

it('should contain default className and prop className', () => {
  const wrapper = shallow(<AuthMenu className='test-class-name' {...defaultProps} />)
  expect(wrapper.props().className).toEqual('tc-auth-menu test-class-name')
})

it('should contain a IconToggle as handle when not authenticated', () => {
  const props = Object.assign({}, defaultProps, {
    auth: {
      enabled: true,
      isAuthenticated: () => (false)
    },
    login: () => jest.fn()
  })
  
  const element = (<IconButton icon='account_circle' />)
  const wrapper = shallow(<AuthMenu {...props} />)
  expect(wrapper.props().handle).toEqual(element)
})

it('should contain a IconToggle as handle with profile picture when authenticated', () => {
  const element = (<IconButton icon={<img src={'123'} style={{ borderRadius: '50%' }}/>} />)
  const wrapper = shallow(<AuthMenu {...defaultProps} />)
  expect(wrapper.props().handle).toEqual(element)
})

it('should have a Sign In menu item when not authenticated', () => {
  const props = Object.assign({}, defaultProps, {
    auth: {
      enabled: true,
      isAuthenticated: () => (false)
    },
    sections: [
      {show: () => (true), authenticated: false, items: [
        {label: 'Sign In', route: '/signin'},
      ]},
      {show: () => (false), authenticated: true, items: [
        {label: 'Settings', route: '/settings'},
        {label: 'Sign Out', route: '/signout'}
      ]}
    ]
  })
  
  const wrapper = shallow(<AuthMenu {...props} />)
  const linkProps = wrapper.find(MenuItem).props()

  expect(linkProps.to).toEqual('/signin')
  expect(linkProps.children).toEqual('Sign In')
})

it('should have a Logout and Settings menu items when authenticated', () => {
  const props = Object.assign({}, defaultProps, {
    auth: {
      enabled: true,
      isAuthenticated: () => (true),
      profile: {picture: '123'}
    },
    sections: [
      {show: () => (true), authenticated: false, items: [
        {label: 'Sign In', route: '/signin'},
      ]},
      {show: () => (true), authenticated: true, items: [
        {label: 'Settings', route: '/settings'},
        {label: 'Sign Out', route: '/signout'}
      ]}
    ]
  })
  
  const wrapper = shallow(<AuthMenu {...props} />)
  const links = wrapper.find(MenuItem)
  expect(links.length).toEqual(2)

  const linksFirst = links.at(0).props()
  expect(linksFirst.to).toEqual('/settings')
  expect(linksFirst.children).toEqual('Settings')

  const linksSecond = links.at(1).props()
  expect(linksSecond.to).toEqual('/signout')
  expect(linksSecond.children).toEqual('Sign Out')
})

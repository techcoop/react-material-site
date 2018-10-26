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
  const element = (<IconButton icon='123' iconOptions={{strategy: 'url'}} className='tc-auth-menu__profile-picture' />)
  const wrapper = shallow(<AuthMenu {...defaultProps} />)
  expect(wrapper.props().handle).toEqual(element)
})

it('should have a Sign In menu item when not authenticated', () => {
  const props = Object.assign({}, defaultProps, {
    auth: {
      enabled: true,
      isAuthenticated: () => (false)
    },
    login: () => jest.fn()
  })
  
  const wrapper = shallow(<AuthMenu {...props} />)
  
  const item = (
    <MenuItem onClick={props.login}>
      Sign In
    </MenuItem>
  )

  expect(wrapper).toContainReact(item)
})

it('should have a Logout menu item when authenticated', () => {
  const props = Object.assign({}, defaultProps, {
    auth: {
      enabled: true,
      isAuthenticated: () => (true),
      profile: {picture: '123'}
    },
    logout: () => jest.fn()
  })
  
  const wrapper = shallow(<AuthMenu {...props} />)
  
  const item = (
    <MenuItem onClick={props.logout}>
      Sign Out
    </MenuItem>
  )

  expect(wrapper).toContainReact(item)
})

it('should have a Settings Link when authenticated', () => {
  const props = Object.assign({}, defaultProps, {
    auth: {
      enabled: true,
      isAuthenticated: () => (true),
      profile: {picture: '123'}
    },
    logout: () => jest.fn()
  })
  
  const wrapper = shallow(<AuthMenu {...props} />)
  const linkProps = wrapper.find(Link).props()
  
  expect(linkProps.to).toEqual('/settings')
  expect(linkProps.children).toEqual('Settings')
})
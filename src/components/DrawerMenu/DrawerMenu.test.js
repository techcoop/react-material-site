import React from 'react'
import { NavLink } from 'react-router-dom'
import { shallow } from 'enzyme'
import {
  Drawer,
  DrawerHeader,
  DrawerContent
} from '@rmwc/drawer'
import {
  List,
  ListItem,
  ListItemText,
  ListItemGraphic
} from '@rmwc/list'
import {
  Icon
} from '@rmwc/icon'

import DrawerMenu from './DrawerMenu'

it('contains default className and prop className and style', () => {
  const style = {border: '1px solid red'}
  const wrapper = shallow(<DrawerMenu className='test-class-name' style={style} />)
  expect(wrapper.props().className).toEqual('tc-drawer-menu test-class-name')
  expect(wrapper.props().style).toEqual(style)
})

it('returns a Drawer with modal set when maximized', () => {
  const wrapper = shallow(<DrawerMenu maximized={true} />)
  expect(wrapper.type()).toEqual(Drawer)
  expect(wrapper.props().modal).toEqual(false)
})

it('returns a Drawer with modal set when not maximized', () => {
  const wrapper = shallow(<DrawerMenu maximized={false} />)
  expect(wrapper.type()).toEqual(Drawer)
  expect(wrapper.props().modal).toEqual(true)
})

it('passes open and close defaults to Drawer', () => {
  const wrapper = shallow(<DrawerMenu />)
  expect(wrapper.props().open).toEqual(DrawerMenu.defaultProps.open)
  expect(wrapper.props().onClose).toEqual(DrawerMenu.defaultProps.close)
})

it('contains a DrawerHeader with name if maximized is false', () => {
  // TODO test icon
  const name = <span className='tc-drawer-menu__header-text'>TEST NAME</span>
  const wrapper = shallow(<DrawerMenu maximized={false} name='TEST NAME' />)
  expect(wrapper).toContainReact(name)
})

it('contains a List when sections with items are passed and show returns true', () => {
  const sections = [
    {show: () => (true), items: [
      { icon: { icon: 'home' }, label: 'Test', route: '/test' },
    ]}
  ]

  const list = (
    <List key={0} className='tc-drawer-menu__spacer'>
      <ListItem key={0} tag={NavLink} to='/test' strict className='tc-drawer-menu__link'>
        <ListItemGraphic icon='home' />
        <ListItemText>Test</ListItemText>
      </ListItem>
    </List>
  )

  const wrapper = shallow(<DrawerMenu sections={sections} />)
  expect(wrapper).toContainReact(list)
})

it('does not contain a NavLink when sections with items are passed but show returns false', () => {
  const sections = [
    {show: () => (false), items: [
      { icon: { icon: 'home' }, label: 'Test', route: '/test' },
    ]}
  ]
  
  const list = (
    <List key={0} className='tc-drawer-menu__spacer'>
      <ListItem key={0} tag={NavLink} to='/test' strict className='tc-drawer-menu__link'>
        <ListItemGraphic icon='home' />
        <ListItemText>Test</ListItemText>
      </ListItem>
    </List>
  )

  const wrapper = shallow(<DrawerMenu sections={sections} />)
  expect(wrapper.contains(list)).toEqual(false)
})

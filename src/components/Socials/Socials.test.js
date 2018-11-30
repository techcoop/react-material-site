import React from 'react'
import { shallow, mount } from 'enzyme'
import { Icon } from '@rmwc/icon'

import Socials from './Socials'

it('should pass style to socials', () => {
  const testStyle = {
    border: '1px solid red'
  }

  const wrapper = shallow(<Socials style={testStyle} />)
  expect(wrapper.props().style).toEqual(testStyle)
})

it('should contain default className and prop className', () => {
  const wrapper = shallow(<Socials className='test-class-name' />)
  expect(wrapper.props().className).toEqual('tc-socials test-class-name')
})


it('it should output an href with icon for an item', () => {
  const url = 'https://testsocial.com'
  const wrapper = shallow(<Socials items={url} />)

  const element = (
    <a
      href={url}
      key={0}
      target='_blank'
      style={{}}
      className='tc-socials__item'
    >
      <Icon
        icon='testsocial'
        iconOptions={{strategy: 'className', basename: 'isc-socials', prefix: 'isc-socials-'}}
      />
    </a>
  )

  expect(wrapper).toContainReact(element)
})

it('it should output an href with icon for an item with empty target and custom itemStyle', () => {
  const url = 'https://testsocial.com'
  const itemStyle = {color: 'red'}
  const wrapper = shallow(
    <Socials
      items={url}
      newTab={false}
      itemStyle={itemStyle}
    />
  )

  const element = (
    <a
      href={url}
      key={0}
      target={undefined}
      style={itemStyle}
      className='tc-socials__item'
    >
      <Icon
        icon='testsocial'
        iconOptions={{strategy: 'className', basename: 'isc-socials', prefix: 'isc-socials-'}}
      />
    </a>
  )

  expect(wrapper).toContainReact(element)
})

it('it should output an item for every url in string list', () => {
  const items = 'https://testsocial1.com,https://testsocial1.com'
  const wrapper = shallow(<Socials items={items} />)
  expect(wrapper.children().length).toEqual(2)
})

it('it should output an item for every url in an array', () => {
  const items = ['https://testsocial1.com', 'https://testsocial1.com']
  const wrapper = shallow(<Socials items={items} />)
  expect(wrapper.children().length).toEqual(2)
})

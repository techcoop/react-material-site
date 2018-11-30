import React from 'react'
import { shallow, mount } from 'enzyme'
import { Elevation } from '@rmwc/menu'

import Message from './Message'

it('should pass style to message', () => {
  const testStyle = {
    border: '1px solid red'
  }

  const wrapper = shallow(<Message style={testStyle} />)
  expect(wrapper.props().style).toEqual(testStyle)
})

it('should contain default className and prop className', () => {
  const wrapper = shallow(<Message className='test-class-name' />)
  expect(wrapper.props().className).toEqual('tc-message test-class-name')
})

it('should output prop value as child', () => {
  const onClick = jest.fn()
  const value = 'TEST'
  const wrapper = shallow(<Message value={value} />)

  const children = (
    <div className='tc-message__body'>
      {value}
      {undefined}
    </div>
  )

  expect(wrapper).toContainReact(children)
})

it('should output children', () => {
  const onClick = jest.fn()
  const value = 'TEST'
  const wrapper = shallow(<Message>{value}</Message>)

  const children = (
    <div className='tc-message__body'>
      {undefined}
      {value}
    </div>
  )

  expect(wrapper).toContainReact(children)
})

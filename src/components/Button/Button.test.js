import React from 'react'
import { shallow, mount } from 'enzyme'

import Button from './Button'
import { Link } from 'react-router-dom'

it('should pass props to button by default', () => {
  const testStyle = {
    border: '1px solid red'
  }

  const wrapper = shallow(<Button style={testStyle} raised />)
  expect(wrapper.props().style).toEqual(testStyle)
  expect(wrapper.props().raised).toEqual(true)
})


it('should create a link when passed with to', () => {
  const to = '/test'
  const wrapper = shallow(<Button to={to} />)
  expect(wrapper.props().to).toEqual(to)
})

it('should create a div when passed with onClick', () => {
  const onClick = jest.fn()
  const wrapper = shallow(<Button onClick={onClick} />)
  expect(wrapper.props().onClick).toEqual(onClick)
})

it('should create render children', () => {
  const children = <div>Test</div>
  const wrapper = shallow(<Button>{children}</Button>)
  expect(wrapper).toContainReact(children)
})

it('should create an element with text', () => {
  const text = 'Text'
  const wrapper = shallow(<Button text={text} />)
  expect(wrapper.children().text()).toEqual(text)
})

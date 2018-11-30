import React from 'react'
import { shallow } from 'enzyme'
import Link from './Link'

it('should pass style to link', () => {
  const testStyle = {
    border: '1px solid red'
  }

  const wrapper = shallow(<Link style={testStyle} />)
  expect(wrapper.props().style).toEqual(testStyle)
})

it('should contain default className and prop className', () => {
  const wrapper = shallow(<Link className='test-class-name' />)
  expect(wrapper.props().className).toEqual('tc-link test-class-name')
})

it('should contain to prop', () => {
  const wrapper = shallow(<Link to='/test-route' />)
  expect(wrapper.props().to).toEqual('/test-route')
})

it('should render children', () => {
  const children = <div>Test</div>
  const wrapper = shallow(<Link>{children}</Link>)
  expect(wrapper).toContainReact(children)
})

it('should create an element with text', () => {
  const text = 'Text'
  const wrapper = shallow(<Link text={text} />)
  expect(wrapper.contains(text)).toEqual(true)
})

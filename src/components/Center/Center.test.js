import React from 'react'
import { shallow, mount } from 'enzyme'
import Center from './Center'

it('should render with default className', () => {
  const wrapper = shallow(<Center />)
  expect(wrapper.props().className).toEqual('tc-center')
})

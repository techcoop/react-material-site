import React from 'react'
import { shallow, mount } from 'enzyme'
import Pager from './Pager'
import { IconButton as MIconButton } from '@rmwc/icon-button'

it('should pass style to pager', () => {
  const wrapper = shallow(<Pager style={{border: '1px solid red'}} />)
  expect(wrapper.props().style).toEqual({border: '1px solid red'})
})

it('should contain default className and prop className', () => {
  const wrapper = shallow(<Pager className='test-class-name' />)
  expect(wrapper.props().className).toEqual('tc-pager test-class-name')
})

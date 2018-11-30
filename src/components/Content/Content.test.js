import React from 'react'
import { shallow, mount } from 'enzyme'
import { Elevation } from '@rmwc/menu'

import Content from './Content'

it('should pass style to content', () => {
  const testStyle = {
    border: '1px solid red'
  }

  const wrapper = shallow(<Content style={testStyle} />)
  expect(wrapper.props().style).toEqual(testStyle)
})

it('should contain default className and prop className', () => {
  const wrapper = shallow(<Content className='test-class-name' />)
  expect(wrapper.props().className).toEqual('tc-content test-class-name')
})

it('should render a header element when passed a string and pass header props', () => {
  const params = {
    value: 'HEADER',
    type: 'headline1',
    tag: 'span',
    className: 'test-class-header',
    style: {border: '1px solid red'}
  }

  const wrapper = shallow(
    <Content 
      header={params.value}
      headerType={params.type}
      headerTag={params.tag}
      headerClassName={params.className}
      headerStyle={params.style}
    />
  )

  const props = wrapper.children().first().props()
  expect(props.children).toEqual(params.value)
  expect(props.use).toEqual(params.type)
  expect(props.tag).toEqual(params.tag)
  expect(props.className).toEqual('tc-content__header ' + params.className)
  expect(props.style).toEqual(params.style)
})

it('should render an array of header elements', () => {
  const items = ['HEADER1', 'HEADER2']
  const wrapper = shallow(<Content header={items} />)
  expect(wrapper.children().length).toEqual(items.length)
})

it('should render an element for header', () => {
  const item = <div>HEADER</div>
  const wrapper = shallow(<Content header={item} />)
  expect(wrapper).toContainReact(item)
})

it('should render a body element when passed a string and pass body props', () => {
  const params = {
    value: 'BODY',
    type: 'body1',
    tag: 'span',
    className: 'test-class-body',
    style: {border: '1px solid red'}
  }

  const wrapper = shallow(
    <Content 
      body={params.value}
      bodyType={params.type}
      bodyTag={params.tag}
      bodyClassName={params.className}
      bodyStyle={params.style}
    />
  )

  const props = wrapper.children().first().props()
  expect(props.children).toEqual(params.value)
  expect(props.use).toEqual(params.type)
  expect(props.tag).toEqual(params.tag)
  expect(props.className).toEqual('tc-content__body ' + params.className)
  expect(props.style).toEqual(params.style)
})

it('should render an array of body elements', () => {
  const items = ['BODY1', 'BODY2']
  const wrapper = shallow(<Content body={items} />)
  expect(wrapper.children().length).toEqual(items.length)
})

it('should render an element for body', () => {
  const item = <div>BODY</div>
  const wrapper = shallow(<Content body={item} />)
  expect(wrapper).toContainReact(item)
})

it('should render a child when passed a string and pass child props', () => {
  const params = {
    value: 'CHILD',
    use: 'body1',
    tag: 'span'
  }

  const wrapper = shallow(
    <Content use={params.use} tag={params.tag}>
      CHILD
    </Content>
  )

  const props = wrapper.children().first().props()
  expect(props.children).toEqual(params.value)
  expect(props.use).toEqual(params.use)
  expect(props.tag).toEqual(params.tag)
})

it('should render a child', () => {
  const wrapper = shallow(
    <Content>
      BODY1
    </Content>
  )

  expect(wrapper.children().length).toEqual(1)
})

it('should render a more than one element', () => {
  const item1 = <div>BODY1</div>
  const item2 = <div>BODY2</div>

  const wrapper = shallow(
    <Content>
      {item1}
      {item2}
    </Content>
  )

  expect(wrapper).toContainReact(item1)
  expect(wrapper).toContainReact(item2)
})

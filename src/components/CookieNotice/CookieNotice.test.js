import React from 'react'
import { shallow, mount } from 'enzyme'

import CookieNotice from './CookieNotice'

it('should pass style to cookie notice', () => {
  const testStyle = {
    border: '1px solid red'
  }

  const wrapper = shallow(<CookieNotice style={testStyle} />)

  expect(wrapper.props().style).toEqual(testStyle)
})

it('should contain default className and prop className', () => {
  const wrapper = shallow(<CookieNotice className='test-class-name' />)
  expect(wrapper.props().className).toEqual('tc-cookie-notice test-class-name')
})

it('should set the id of the element to the accept key', () => {
  const id = 'test-cookie-notice'
  const wrapper = shallow(<CookieNotice acceptKey={id} />)
  expect(wrapper.props().id).toEqual(id)
})

it('should return null when the accept key cookie is set', () => {
  const key = 'test-cookie-notice'
  document.cookie = `${key}=1`
  const wrapper = shallow(<CookieNotice acceptKey={key} />)
  expect(wrapper.html()).toEqual(null)
})

it('should contain a content element with title and message', () => {
  const title = 'cookie notice title'
  const message = 'cookie notice message'

  const wrapper = shallow(<CookieNotice title={title} message={message} />)
  const props = wrapper.children().first().props()

  expect(props.header).toEqual(title)
  expect(props.body).toEqual(message)
})

it('should create an accept button', () => {
  const acceptText = 'TEST ACCEPT'
  const acceptStyle = {color: 'white', position: 'absolute', right: '0.5em', border: '1px solid red'}
  const acceptKey = 'test-cookie-notice-accept'
  const acceptDays = 1

  const wrapper = shallow(<CookieNotice
    acceptText={acceptText}
    acceptStyle={acceptStyle}
    acceptKey={acceptKey}
    acceptDays={acceptDays}
  />)

  const button = wrapper.find(`[text="${acceptText}"]`)
  const props = button.props()

  expect(props.text).toEqual(acceptText)
  expect(props.style).toEqual(acceptStyle)

  // TODO test coverage for button click setting cookie
})

it('should create an accept button', () => {
  const policyText = 'TEST READ MORE'
  const policyStyle = {color: 'white', position: 'absolute', right: '0.5em', border: '1px solid red'}
  const policyUrL = '/test-privacy'

  const wrapper = shallow(<CookieNotice
    policyText={policyText}
    policyStyle={policyStyle}
    policyUrL={policyUrL}
  />)

  const button = wrapper.find(`[text="${policyText}"]`)
  const props = button.props()
  
  expect(props.text).toEqual(policyText)
  expect(props.to).toEqual(policyUrL)
  expect(props.style).toEqual(policyStyle)
})
import React from 'react'
import { shallow, mount } from 'enzyme'
import Form from './Form'
import { FormField } from '@rmwc/formfield'
import { TextField, TextFieldHelperText } from '@rmwc/textfield'
import { Checkbox } from '@rmwc/checkbox'
import { Switch } from '@rmwc/switch'
import { Radio } from '@rmwc/radio'
import { Select } from '@rmwc/select'
import { Slider } from '@rmwc/slider'
import { Button } from '@rmwc/button'

const defaultName = 'testfield'
const getParameters = (type, value='text456') => {
  return {
    fields: {[defaultName]: {type: type, label: 'Label', style: {border: '1px solid red'}}},
    data: {[defaultName]: value},
    onChange: jest.fn()
  }
}

it('should pass a default className, prop className, prop style, and prop onSubmit to form', () => {
  const onSubmit = jest.fn()
  const style = {border: '1px solid red'}

  const wrapper = shallow(
    <Form
      className='test-class-name'
      style={style}
      onSubmit={onSubmit}
    />
  )

  expect(wrapper.props().className).toEqual('tc-form test-class-name')
  expect(wrapper.props().style).toEqual(style)
  expect(wrapper.props().onSubmit).toEqual(onSubmit)
})

it('should contain a text field with type text', () => {
  const params = getParameters('text')
  const wrapper = mount(
    <Form
      fields={params.fields}
      data={params.data}
      onChange={params.onChange}
    />
  )
  
  const element = wrapper.find(TextField)
  expect(element.length).toEqual(1)
  expect(element.props().name).toEqual(defaultName)
  expect(element.props().value).toEqual(params.data[defaultName])
  expect(element.props().label).toEqual(params.fields[defaultName].label)
  expect(element.props().style).toEqual(params.fields[defaultName].style)
  expect(element.props().onChange).toEqual(params.onChange)
})

it('should contain a textarea with type textarea', () => {
  const params = getParameters('textarea')
  const wrapper = mount(
    <Form
      fields={params.fields}
      data={params.data}
      onChange={params.onChange}
    />
  )
  
  const element = wrapper.find(TextField)
  expect(element.length).toEqual(1)
  expect(element.props().name).toEqual(defaultName)
  expect(element.props().textarea).toEqual(true)
  expect(element.props().value).toEqual(params.data[defaultName])
  expect(element.props().label).toEqual(params.fields[defaultName].label)
  expect(element.props().style).toEqual(params.fields[defaultName].style)
  expect(element.props().onChange).toEqual(params.onChange)
})

it('should contain a checkbox with type checkbox', () => {
  const params = getParameters('checkbox', true)
  const wrapper = mount(
    <Form
      fields={params.fields}
      data={params.data}
      onChange={params.onChange}
    />
  )
  
  const element = wrapper.find(Checkbox)
  expect(element.length).toEqual(1)
  expect(element.props().name).toEqual(defaultName)
  expect(element.props().checked).toEqual(params.data[defaultName])
  expect(element.props().label).toEqual(params.fields[defaultName].label)
  expect(element.props().style).toEqual(params.fields[defaultName].style)
  expect(element.props().onChange).toEqual(params.onChange)
})

it('should contain a switch with type switch', () => {
  const params = getParameters('switch', true)
  const wrapper = mount(
    <Form
      fields={params.fields}
      data={params.data}
      onChange={params.onChange}
    />
  )
  
  const element = wrapper.find(Switch)
  expect(element.length).toEqual(1)
  expect(element.props().name).toEqual(defaultName)
  expect(element.props().checked).toEqual(params.data[defaultName])
  expect(element.props().label).toEqual(params.fields[defaultName].label)
  expect(element.props().style).toEqual(params.fields[defaultName].style)
  expect(element.props().onChange).toEqual(params.onChange)
})
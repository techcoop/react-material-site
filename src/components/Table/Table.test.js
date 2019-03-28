import React from 'react'
import { shallow, mount } from 'enzyme'
import Table from './Table'
import {
  DataTableHead,
  DataTableBody,
  DataTableHeadCell,
  DataTableRow,
  DataTableCell
} from '@rmwc/data-table'

it('should pass style to table', () => {
  const wrapper = shallow(<Table style={{border: '1px solid red'}} />)
  expect(wrapper.props().style).toEqual({border: '1px solid red'})
})

it('should contain default className and prop className', () => {
  const wrapper = shallow(<Table className='test-class-name' />)
  expect(wrapper.props().className).toEqual('tc-table test-class-name')
})

it('should contain wrap className when passed wrap', () => {
  const wrapper = shallow(<Table wrap />)
  expect(wrapper.props().className).toContain('tc-table_wrap')
})

it('should render headers that are passed to it with style and options', () => {
  const fields = {
    field1: {label: 'field1', style: {width: '1px'}, options: {test: '1'}},
    field2: {label: 'field2', style: {width: '2px'}, options: {test: '2'}},
  }

  const wrapper = shallow(<Table fields={fields} />)

  const children = (
    <DataTableRow>
      <DataTableHeadCell key={0} style={{width: '1px'}} test='1'>
        field1
      </DataTableHeadCell>
      <DataTableHeadCell key={1} style={{width: '2px'}} test='2'>
        field2
      </DataTableHeadCell>
    </DataTableRow>
  )

  expect(wrapper).toContainReact(children)
})

it('should render rows with field data and rowStyle', () => {
  const fields = {
    field1: {label: 'field1', rowStyle: {width: '1px'}},
    field2: {label: 'field2', rowStyle: {width: '2px'}},
  }

  const data = [
    {field1: 'row1 field1', field2: 'row1 field2'},
    {field1: 'row2 field1', field2: 'row2 field2'}
  ]

  const wrapper = shallow(<Table fields={fields} data={data} />)
  
  const children = (
    <DataTableBody>
      <DataTableRow key={0} className=''>
        <DataTableCell key={0} style={{width: '1px'}}>
          row1 field1
        </DataTableCell>
        <DataTableCell key={1} style={{width: '2px'}}>
          row1 field2
        </DataTableCell>
      </DataTableRow>
      <DataTableRow key={1} className=''>
        <DataTableCell key={0} style={{width: '1px'}}>
          row2 field1
        </DataTableCell>
        <DataTableCell key={1} style={{width: '2px'}}>
          row2 field2
        </DataTableCell>
      </DataTableRow>
    </DataTableBody>
  )

  expect(wrapper).toContainReact(children)
})

it('should allow a render function to format data', () => {
  const fields = {
    field1: {label: 'field1', render: (value) => `${value} render`}
  }

  const data = [
    {field1: 'formatted'}
  ]

  const wrapper = shallow(<Table fields={fields} data={data} />)

  const children = (
    <DataTableCell key={0}>
      formatted render
    </DataTableCell>
  )

  expect(wrapper).toContainReact(children)
})

it('should allow clickable row when passed a rowClick function', () => {
  const fields = {
    field1: {label: 'field1'}
  }

  const data = [
    {field1: 'clickable'}
  ]

  const onClick = jest.fn()

  const wrapper = shallow(<Table fields={fields} data={data} rowClick={onClick} />)
  const row = wrapper.find(DataTableRow).at(1).props()
  expect(row.className).toEqual('tc-table__row_clickable')
  expect(typeof row.onClick).toEqual('function')
})

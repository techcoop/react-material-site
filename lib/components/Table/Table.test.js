import React from 'react';
import { shallow, mount } from 'enzyme';
import Table from './Table';
import { DataTableHead, DataTableBody, DataTableHeadCell, DataTableRow, DataTableCell } from '@rmwc/data-table';
it('should pass style to table', () => {
  const wrapper = shallow(React.createElement(Table, {
    style: {
      border: '1px solid red'
    }
  }));
  expect(wrapper.props().style).toEqual({
    border: '1px solid red'
  });
});
it('should contain default className and prop className', () => {
  const wrapper = shallow(React.createElement(Table, {
    className: "test-class-name"
  }));
  expect(wrapper.props().className).toEqual('tc-table test-class-name');
});
it('should contain wrap className when passed wrap', () => {
  const wrapper = shallow(React.createElement(Table, {
    wrap: true
  }));
  expect(wrapper.props().className).toContain('tc-table_wrap');
});
it('should render headers that are passed to it with style and options', () => {
  const fields = {
    field1: {
      label: 'field1',
      style: {
        width: '1px'
      },
      options: {
        test: '1'
      }
    },
    field2: {
      label: 'field2',
      style: {
        width: '2px'
      },
      options: {
        test: '2'
      }
    }
  };
  const wrapper = shallow(React.createElement(Table, {
    fields: fields
  }));
  const children = React.createElement(DataTableRow, null, React.createElement(DataTableHeadCell, {
    key: 0,
    style: {
      width: '1px'
    },
    test: "1"
  }, "field1"), React.createElement(DataTableHeadCell, {
    key: 1,
    style: {
      width: '2px'
    },
    test: "2"
  }, "field2"));
  expect(wrapper).toContainReact(children);
});
it('should render rows with field data and rowStyle', () => {
  const fields = {
    field1: {
      label: 'field1',
      rowStyle: {
        width: '1px'
      }
    },
    field2: {
      label: 'field2',
      rowStyle: {
        width: '2px'
      }
    }
  };
  const data = [{
    field1: 'row1 field1',
    field2: 'row1 field2'
  }, {
    field1: 'row2 field1',
    field2: 'row2 field2'
  }];
  const wrapper = shallow(React.createElement(Table, {
    fields: fields,
    data: data
  }));
  const children = React.createElement(DataTableBody, null, React.createElement(DataTableRow, {
    key: 0
  }, React.createElement(DataTableCell, {
    key: 0,
    style: {
      width: '1px'
    }
  }, "row1 field1"), React.createElement(DataTableCell, {
    key: 1,
    style: {
      width: '2px'
    }
  }, "row1 field2")), React.createElement(DataTableRow, {
    key: 1
  }, React.createElement(DataTableCell, {
    key: 0,
    style: {
      width: '1px'
    }
  }, "row2 field1"), React.createElement(DataTableCell, {
    key: 1,
    style: {
      width: '2px'
    }
  }, "row2 field2")));
  expect(wrapper).toContainReact(children);
});
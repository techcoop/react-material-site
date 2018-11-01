function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';
import cN from 'classnames';
import { DataTable, DataTableContent, DataTableHead, DataTableBody, DataTableHeadCell, DataTableRow, DataTableCell } from '@rmwc/data-table'; // TODO fix imports for .css files and move to scss instead

import '@rmwc/data-table/data-table.css';
import './Table.scss'; // TODO implement handling for numbers
// TODO implement handling for sorting
// TODO improve support for error cases

/*
<DataTableHeadCell
  alignEnd
  sort={this.state.sortDir || null}
  onSortChange={sortDir => {
    this.setState({sortDir})
    console.log(sortDir)
  }}
>
  Quantity (Click Me)
</DataTableHeadCell>
*/
// TODO implement the rest of the functionality from data tables
// https://jamesmfriedman.github.io/rmwc/data-tables

export const Table = props => React.createElement(DataTable, {
  style: props.style,
  className: cN('tc-table', props.className, {
    'tc-table_wrap': props.wrap
  })
}, React.createElement(DataTableContent, null, React.createElement(DataTableHead, null, React.createElement(DataTableRow, null, props.fields && Object.keys(props.fields).map((field, index) => React.createElement(DataTableHeadCell, _extends({
  key: index,
  style: props.fields[field].style
}, props.fields[field].options), props.fields[field].label)))), React.createElement(DataTableBody, null, props.data && props.data.map((row, index) => React.createElement(DataTableRow, {
  key: index
}, Object.keys(row).map((field, index) => React.createElement(DataTableCell, {
  key: index,
  style: props.fields[field].rowStyle //className={cN({'mdl-data-table__cell--non-numeric': props.fields[field].type !== 'number'} )}

}, row[field])))))));
Table.defaultProps = {
  wrap: false
};
Table.propTypes = {
  fields: PropTypes.object,
  data: PropTypes.array,
  style: PropTypes.object,
  className: PropTypes.string,
  wrap: PropTypes.bool
};
export default Table;
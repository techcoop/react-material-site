import React from 'react'
import PropTypes from 'prop-types'
import cN from 'classnames'
import {
  DataTable,
  DataTableContent,
  DataTableHead,
  DataTableBody,
  DataTableHeadCell,
  DataTableRow,
  DataTableCell
} from '@rmwc/data-table'

// TODO fix imports for .css files and move to scss instead
import '@rmwc/data-table/data-table.css'

import './Table.scss'

// TODO implement handling for numbers
// TODO implement handling for sorting
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
export const Table = (props) => (
  <DataTable style={props.style} className={cN('tc-table', props.className, {'tc-table_wrap': props.wrap})}>
    <DataTableContent>
      <DataTableHead>
        <DataTableRow>
          {props.fields && Object.keys(props.fields).map((field, index) => (
            <DataTableHeadCell 
              key={index}
              style={props.fields[field].style}
              {...props.fields[field].options}
              //className={cN({'mdl-data-table__cell--non-numeric': props.fields[field].type !== 'number'} )}
            >
              {props.fields[field].label}
            </DataTableHeadCell>
          ))}
        </DataTableRow>
      </DataTableHead>
      <DataTableBody>
        {props.data && props.data.map((row, index) => (
          <DataTableRow key={index}>
            {Object.keys(row).map((field, index) => (
              <DataTableCell 
                key={index}
                style={props.fields[field].rowStyle}
                //className={cN({'mdl-data-table__cell--non-numeric': props.fields[field].type !== 'number'} )}
              >
                {row[field]}
              </DataTableCell>
            ))}
          </DataTableRow>
        ))}
      </DataTableBody>
    </DataTableContent>
  </DataTable>
)

Table.defaultProps = {
  wrap: false
}

Table.propTypes = {
  fields: PropTypes.object,
  data: PropTypes.array,
  style: PropTypes.object,
  className: PropTypes.string,
  wrap: PropTypes.bool
}

export default Table

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
import { TextField } from '@rmwc/textfield'

// TODO fix imports for .css files and move to scss instead
import '@rmwc/data-table/data-table.css'

import './Table.scss'

// TODO implement handling for numbers
// TODO improve support for error cases
// TODO tests for sorting
// TODO tests for filtering
export const Table = props => (
  <DataTable style={props.style} className={cN('tc-table', props.className, {'tc-table_wrap': props.wrap})}>
    <DataTableContent>
      <DataTableHead>
        <DataTableRow>
          {props.fields && Object.keys(props.fields).map((field, index) => (
            <DataTableHeadCell 
              key={index}
              style={props.fields[field].style}
              sort={props.sortChange ? props.sortDir && props.sortField === field ? parseInt(props.sortDir) : null : undefined}
              onSortChange={props.sortChange ? (sortDir) => {
                props.sortChange(sortDir, field)
              } : undefined}
              {...props.fields[field].options}
            >
              {props.fields[field].label}
            </DataTableHeadCell>
          ))}
        </DataTableRow>

        {props.filterChange && 
          <DataTableRow>
            {props.fields && Object.keys(props.fields).map((field, index) => (
              <DataTableCell key={index} style={{padding: '4px'}}>
                {props.fields[field].filter && 
                  <TextField
                    name={field}
                    value={props.search && props.search.get(field) 
                      ? props.search.get(field).replace(/\*/g, '') 
                      : ''}
                    onChange={(event) => {
                      props.filterChange(event.target.value, field)
                    }}
                    style={{width: '100%' }}
                  />}
              </DataTableCell>
            ))}
          </DataTableRow>}
      </DataTableHead>
      <DataTableBody>
        {props.data && props.data.map((row, index) => (
          <DataTableRow 
            key={index}
            onClick={props.rowClick ? () => props.rowClick(row) : undefined}
            className={cN({'tc-table__row_clickable': props.rowClick})}
          >
            {Object.keys(props.fields).map((field, index) => (
              <DataTableCell 
                key={index}
                style={props.fields[field].rowStyle}
              >
                {props.fields[field].render ? props.fields[field].render(row[field]) : row[field]}
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
  wrap: PropTypes.bool,
  
  filterChange: PropTypes.func,
  search: PropTypes.object,
  rowClick: PropTypes.func,

  sortField: PropTypes.string,
  sortDirection: PropTypes.number,
  sortChange: PropTypes.func
}

export default Table

// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import CustomTable from './index'
const _data = [{ id: 1, name: 'foo', phone: 123456789 }, { id: 2, name: 'Woo', phone: 234567891 }]
storiesOf('CustomTable  - web', module)
  .add('default', () => (
    <CustomTable
      data={_data}
      minRows={0}
      className='-striped -highlight'
      noDataText='No rates found'
      style={{
        height: '300px' // This will force the table body to overflow and scroll, since there is not enough room
      }}
      columns={[{
        columns: [
          {
            accessor: 'id',
            className: 'text strong',
            label: 'Id'
          },
          {
            accessor: 'name',
            className: 'text strong',
            label: 'Name'
          },
          {
            Cell: (d) => <span className='rate'>{d.original.phone}</span>,
            id: 'phone',
            className: 'text',
            label: 'Phone',
            maxWidth: 120
          }]
      }]} />
  ))

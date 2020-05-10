// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import TableInputGroup from './index'
const _header = [
  { width: '28px', type: 'header-text', value: 'Checkbox' },
  { width: '28px', type: 'header-text', value: 'Text' },
  { width: '28px', type: 'header-text', value: 'Input' },
  { width: '28px', type: 'header-text', value: 'ACTIONS' }
]

storiesOf('TableInputGroup  - web', module)
  .add('default', () => (
    <TableInputGroup headerRow={_header} rows={[{
      columns: [
        { width: '28px', type: 'checkbox' },
        { width: '54px', type: 'text', value: 'hello' },
        { width: '28px', type: 'text-input' },
        { width: '58px', type: 'icon-button', name: 'archive-1', icon: 'ion-trash-b', contentAlign: 'center' }
      ]
    }]} />
  ))

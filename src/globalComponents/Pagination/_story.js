// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import Pagination from './index'

storiesOf('Pagination  - web', module)
  .add('default', () => (
    <Pagination pageSize={10} initialPage={0} onChangePage={() => { return null }} />
  ))

// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import PaginationElement from './index'

storiesOf('PaginationElement  - web', module)
  .add('default', () => (
    <PaginationElement totalPages={10} />
  ))

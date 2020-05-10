// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import Badge from './index'

storiesOf('Badge  - web', module)
  .add('default', () => (
    <div style={{ width: '20px', padding: '100px' }}>
      <Badge test='foo' />
    </div>
  ))

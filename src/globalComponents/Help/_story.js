// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import Help from './index'

storiesOf('Help  - web', module)
  .add('default', () => (
    <div style={{ padding: '100px' }}>
      <Help text='foo' />
    </div>
  ))

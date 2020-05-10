// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import ReduxPopupAlert from './index'

storiesOf('ReduxPopupAlert  - web', module)
  .add('default', () => (
    <div style={{ padding: '100px' }}>
      <ReduxPopupAlert show title='foo' text='Are you sure?' />
    </div>
  ))

// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import FullScreenTextOnly from './index'

storiesOf('FullScreenTextOnly  - web', module)
  .add('default', () => (
    <FullScreenTextOnly text='foo' />
  ))

// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import CenteredTextNotify from './index'

storiesOf('CenteredTextNotify  - shared', module)
  .add('default', () => (
    <CenteredTextNotify text='foo' />
  ))

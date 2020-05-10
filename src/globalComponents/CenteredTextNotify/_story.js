// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import CenteredTextNotify from './index'

storiesOf('CenteredTextNotify  - web', module)
  .add('default', () => (
    <CenteredTextNotify text='foo' />
  ))

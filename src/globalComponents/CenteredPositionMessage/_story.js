// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import CenteredPositionMessage from './index'

storiesOf('CenteredPositionMessage  - web', module)
  .add('CenteredPositionMessage', () => (
    <CenteredPositionMessage text='foo' />
  ))

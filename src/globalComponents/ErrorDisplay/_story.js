// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import ErrorDisplay from './index'

storiesOf('ErrorDisplay  - web', module)
  .add('default', () => (
    <ErrorDisplay />
  ))
